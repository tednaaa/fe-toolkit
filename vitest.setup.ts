import { config } from '@vue/test-utils';
import { textFinders } from './src/testing/queries';

config.plugins.VueWrapper.install(textFinders);
