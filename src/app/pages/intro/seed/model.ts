import { isAllowedWord } from '@app/core/api';
import { getInputValue } from '@app/core/utils';
import {
  combine,
  createEffect, createEvent, restore, sample,
} from 'effector';
import { debounce } from 'patronum';
import React from 'react';

const setErrors = createEvent<any[]>();

const SEED_PHRASE_COUNT = 12;

const INITIAL = new Array(SEED_PHRASE_COUNT).fill(null);

export const $errors = restore(setErrors, INITIAL);

export const $valid = $errors.map(
  (errors) => errors.every((value) => value === true),
);

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

export const onInput = createEvent<InputChangeEvent>();

const onInputDebounced = debounce({
  source: onInput,
  timeout: 200,
});

createEvent<number>();

const setTarget = sample({
  source: onInput,
  fn: (event) => {
    event.preventDefault();
    const { name } = event.target;
    const index = parseInt(name, 10);
    return index;
  },
});

const isAllowedWordFx = createEffect(isAllowedWord);

onInputDebounced.map(getInputValue).watch(isAllowedWordFx);

const $target = restore(setTarget, null);

sample({
  source: combine($errors, $target),
  clock: isAllowedWordFx.doneData,
  fn: ([errors, target], result) => {
    const next = errors.slice();
    next[target] = result;
    return next;
  },
  target: setErrors,
});
