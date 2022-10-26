export namespace list {
    const engines: string[];
    const forms: string[];
}
export namespace content {
    function resolve(markup: any, contentFragments: any): string;
    function resolveServer(markup: any, data: any): string;
}
export namespace serverForms {
    export function simpleform(data: any): string;
    function _default(data: any): string;
    export { _default as default };
}
export namespace engines {
    function bootstrap3(markup: any): string;
    function bootstrap5(markup: any): string;
    function skeleton(markup: any): string;
    function tailwind(markup: any): string;
    function none(markup: any): any;
}
export function transformPPToJSX(markup: any): string;
export namespace templates {
    export function none_1(title: any, content: any, styles: any): string;
    export { none_1 as none };
    export function bootstrap3_1(title: any, content: any, styles: any): string;
    export { bootstrap3_1 as bootstrap3 };
    export function bootstrap5_1(title: any, content: any, styles: any): string;
    export { bootstrap5_1 as bootstrap5 };
    export function tailwind_1(title: any, content: any, styles: any): string;
    export { tailwind_1 as tailwind };
    export function skeleton_1(title: any, content: any, styles: any): string;
    export { skeleton_1 as skeleton };
}
