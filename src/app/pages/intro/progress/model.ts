import { createEvent, guard, restore } from 'effector';

import { RPCEvent, SyncProgress } from '@app/core/types';
import { setView, View } from '@app/model/view';
import { sendWalletEvent } from '@core/api';

export const setSyncProgress = createEvent<[number, number]>();

export const $syncProgress = restore(setSyncProgress, [0, 0]);

export const $syncPercent = $syncProgress.map<number>((state, last) => {
  const [done, total] = state;
  const next = done === 0 ? 0 : Math.floor((done / total) * 100);
  if (last >= next) {
    return last;
  }
  return next;
});

const setLoading = createEvent<boolean>();

const $loding = restore(setLoading, true);

// receive Progress data
const onProgress = sendWalletEvent.filterMap(({ id, result }) => (
  id === RPCEvent.SYNC_PROGRESS ? result as SyncProgress : undefined
));

guard(onProgress, {
  filter: $loding,
})
  .watch(({
    sync_requests_done,
    sync_requests_total,
    current_state_hash,
    tip_state_hash,
  }) => {
    if (current_state_hash === tip_state_hash) {
      setLoading(false);
      setView(View.WALLET);
    } else {
      setSyncProgress([sync_requests_done, sync_requests_total]);
    }
  });
