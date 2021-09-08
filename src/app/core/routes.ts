import {
  Login, Restore, Create, SetPassword, Progress,
} from '@pages/intro';

import {
  Wallet, Receive, SendConfirm, SendForm, Utxo,
} from '@pages/main';

import { View } from '@app/model/view';

const ROUTES = {
  [View.LOGIN]: Login,
  [View.RESTORE]: Restore,
  [View.CREATE]: Create,
  [View.SET_PASSWORD]: SetPassword,
  [View.PROGRESS]: Progress,
  [View.WALLET]: Wallet,
  [View.SEND_FORM]: SendForm,
  [View.SEND_CONFIRM]: SendConfirm,
  [View.RECEIVE]: Receive,
  [View.UTXO]: Utxo,
};

export default ROUTES;
