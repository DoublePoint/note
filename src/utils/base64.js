/**
 * ES6: base64解码
 */
export function decodeBase64Content(base64Content) {
    let commonContent = base64Content.replace(/\s/g, '+')
    commonContent = Buffer.from(commonContent, 'base64').toString()
    return commonContent
}
/**
 * ES6: base64编码
 */
export function encodeBase64Content(commonContent) {
    let base64Content = Buffer.from(commonContent).toString('base64')
    return base64Content
}
