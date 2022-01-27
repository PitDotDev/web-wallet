import { Configuration, ConfigurationObject } from '@app/shared/interface';

const { NODE_ENV = 'development' } = process.env;

const development: Configuration = {
  env: NODE_ENV,
  explorer_url: 'https://master-net.explorer.beam.mw/block?kernel_id=',
  restore_url: 'https://mobile-restore.beam.mw/masternet/masternet_recovery.bin',
};

const master_net: Configuration = {
  ...development,
};

const test_net: Configuration = {
  ...development,
  explorer_url: 'https://testnet.explorer.beam.mw/block?kernel_id=',
  restore_url: 'https://mobile-restore.beam.mw/testnet/testnet_recovery.bin',
};

const main_net: Configuration = {
  ...development,
  explorer_url: 'https://explorer.beam.mw/block?kernel_id=',
  restore_url: 'https://mobile-restore.beam.mw/mainnet/mainnet_recovery.bin',
};

const production: Configuration = {
  ...test_net,
};

const config: ConfigurationObject = {
  development,
  production,
  master_net,
  test_net,
  main_net,
};

const configElement: Configuration = (config as any)[NODE_ENV];

export default configElement;
