import { L10nConfig } from 'angular-l10n'
import { AppSettingsConfig } from '@app/configs/app-settings.config'

export const l10nConfig: L10nConfig = {
    format: 'language-region',
    providers: [
        { name: 'app', asset: 'assets/i18n/i18n', options: { version: AppSettingsConfig.version } },
    ],
    cache: true,
    keySeparator: '.',
    defaultLocale: AppSettingsConfig.default_locale,
    schema: [
        { locale: { language: 'en-US', currency: 'USD' }, dir: 'ltr', text: 'United States' },
        { locale: { language: 'ru-UA', currency: 'UAH' }, dir: 'ltr', text: 'Russia' },
    ],
};
