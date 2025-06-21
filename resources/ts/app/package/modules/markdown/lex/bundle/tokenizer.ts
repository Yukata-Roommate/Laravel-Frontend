/*****************************************
 * Package Module Markdown Lex Bundle
 *
 * Tokenizer
 *****************************************/

import type { Token } from "../tokenize/types";

import { BaseBundler } from "./base";

import { BaseTokenizer } from "../tokenize/base";
import { BoldTextTokenizer } from "../tokenize/text/bold";
import { CodeTextTokenizer } from "../tokenize/text/code";
import { ItalicTextTokenizer } from "../tokenize/text/italic";
import { NormalTextTokenizer } from "../tokenize/text/normal";
import { StrikeTextTokenizer } from "../tokenize/text/strike";
import { NamedLinkTokenizer } from "../tokenize/link/named";
import { NoNameLinkTokenizer } from "../tokenize/link/noName";
import { TelephoneLinkTokenizer } from "../tokenize/link/telephone";
import { FullSpaceOrnamentTokenizer } from "../tokenize/ornament/fullSpace";
import { HalfSpaceOrnamentTokenizer } from "../tokenize/ornament/halfSpace";
import { TabOrnamentTokenizer } from "../tokenize/ornament/tab";

/**
 * Tokenize Bundler
 */
export abstract class TokenizeBundler extends BaseBundler {
    /*----------------------------------------*
     * Bundle: Tokenize
     *----------------------------------------*/

    /**
     * trimming pattern
     *
     * @type {RegExp}
     */
    protected abstract readonly trimPattern: RegExp;

    /**
     * tokenize row
     *
     * @param {string} row
     * @return {Token[]}
     */
    protected tokenize(row: string): Token[] {
        let tokens: Token[] = [];
        let position: number = 0;
        let isContinue: boolean = false;

        const tokenizers: BaseTokenizer[] = this.tokenizers();

        const trimmed: string = row.trim().replace(this.trimPattern, "").trim();

        while (position < trimmed.length) {
            const sliced: string = trimmed.slice(position);

            isContinue = false;

            for (const tokenizer of tokenizers) {
                if (!tokenizer.match(sliced)) continue;

                tokens.push(tokenizer.tokenize(sliced));

                position = tokenizer.position(sliced, position);

                isContinue = true;

                break;
            }

            if (isContinue) continue;

            const tokenizer = new NormalTextTokenizer();

            tokens.push(tokenizer.tokenize(sliced));

            position = tokenizer.position(sliced, position);
        }

        return tokens;
    }

    /**
     * get tokenizers
     *
     * @return {BaseTokenizer[]}
     */
    protected tokenizers(): BaseTokenizer[] {
        return [
            new BoldTextTokenizer(),
            new CodeTextTokenizer(),
            new ItalicTextTokenizer(),
            new StrikeTextTokenizer(),

            new NamedLinkTokenizer(),
            new NoNameLinkTokenizer(),
            new TelephoneLinkTokenizer(),

            new FullSpaceOrnamentTokenizer(),
            new HalfSpaceOrnamentTokenizer(),
            new TabOrnamentTokenizer(),
        ];
    }
}
