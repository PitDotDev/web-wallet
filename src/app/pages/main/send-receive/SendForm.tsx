/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useStore } from 'effector-react';

import { GROTHS_IN_BEAM } from '@app/model/rates';
import { gotoConfirm, gotoWallet } from '@app/model/view';
import {
  Window, Section, Input, Button, Title, Select,
} from 'app/uikit';
import ArrowIcon from '@icons/icon-arrow.svg';

import {
  $valid,
  $address,
  $addressLabel,
  $addressValid,
  onAddressInput,
  $totalSelected,
} from './model';

import AmountInput from './AmountInput';
import { $assets } from '../wallet/model';

const SendForm = () => {
  const address = useStore($address);
  const addressValid = useStore($addressValid);
  const addressLabel = useStore($addressLabel);

  const assets = useStore($assets);
  const total = useStore($totalSelected);
  const groths = total.available / GROTHS_IN_BEAM;

  const valid = useStore($valid);

  return (
    <Window
      title="Send"
      pallete="purple"
      onBackClick={gotoWallet}
    >
      <form onSubmit={gotoConfirm}>
        <Section title="Send to" variant="gray">
          <Input
            variant="gray"
            label={addressLabel}
            valid={addressValid}
            placeholder="Paste recipient address here"
            value={address}
            onInput={onAddressInput}
          />
        </Section>
        <Section title="Amount" variant="gray">
          <AmountInput />
          <Title variant="subtitle">Available</Title>
          {`${groths} ${assets[total.asset_id].metadata_pairs.N}`}
        </Section>
        <Section title="Comment" variant="gray">
          <Input variant="gray" />
        </Section>
        <Button
          pallete="purple"
          icon={ArrowIcon}
          type="submit"
          disabled={!valid}
        >
          next
        </Button>
      </form>
    </Window>
  );
};

export default SendForm;
