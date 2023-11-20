const findOutElement = (el: PointerEvent, classArr: string[]) => {
    let parentElement = el.target as HTMLElement | null
    while (parentElement !== null && parentElement !== document.body) {
        const classList = parentElement?.classList
        if (!classList) return false
        let isFind = false
        classArr.forEach((item) => {
            if (classList.contains(item)) {
                isFind = true
            }
        })
        if (isFind) return true
        parentElement = parentElement.parentElement
    }
    return false
}
export { findOutElement }
