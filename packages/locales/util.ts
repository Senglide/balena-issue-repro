import { i18n } from '@lingui/core'
import * as constants from '@dripl/constants'
import * as plurals from 'make-plural/plurals'
import enCatalog from './en/messages'
import nlCatalog from './nl/messages'

const { LANGUAGE_NL_BE, LANGUAGE_EN, DEFAULT_LANGUAGE } = constants

const supportedLanguages = [
    {
        code: LANGUAGE_NL_BE,
        catalog: nlCatalog.messages,
    },
    {
        code: LANGUAGE_EN,
        catalog: enCatalog.messages,
    },
]

/* eslint-disable import/prefer-default-export */
export function setupLocales(locale = DEFAULT_LANGUAGE) {
    i18n.load(
        supportedLanguages.reduce(
            (acc, { code, catalog }) => ({
                ...acc,
                [code]: catalog,
            }),
            {}
        )
    )
    supportedLanguages.forEach(({ code }) => {
        i18n.loadLocaleData(code, {
            plurals: plurals[code],
        })
    })
    i18n.activate(locale)
    return i18n
}