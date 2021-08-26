const DATA_ARRAY = {
    sites: [
        {
            url: "https://funpay.ru/users/1333773/",
            deleted: [
                ".offer", ".bg-light-color"
            ],
        },
        {
            url: /^https:\/\/funpay.ru\/orders\/\?.*/,
            deleted: [
                "#content > div > div > div.tc.tc-finance.table-hover.table-clickable.dyn-table.orders-table"
            ],
            append: [
                {".page-content-full": '<p class="lead">Пусто.</p>'}
            ]
        },
        {
            url: /^https:\/\/funpay.ru\/orders\/$/g,
            deleted: [
                "#content > div > div > div.tc.tc-finance.table-hover.table-clickable.dyn-table.orders-table > div.dyn-table-body > a:nth-child(1)",
            ],
            deleteMultiply: 4,
        },
        {
            url: /https:\/\/funpay.ru\/orders\/trade.*/g,
            deleted: [
                "#content > div > div > div.tc.tc-finance.table-hover.table-clickable.dyn-table.orders-table"
            ],
            append: [
                {".page-content-full": '<p class="lead">Пусто.</p>'}
            ]
        },
        {
            url: /https:\/\/funpay.ru\/chat.*/g,
            deleted: [
                "#content > div > div > div > div.chat-contacts > div.contact-list.custom-scroll > a:nth-child(1)"
            ],
            deleteMultiply: 29,
            // "changed": [
            //     {"": ""}
            // ]
        },
    ]
}
const currentUrl = window.location.href
selectCurrentSite()

function selectCurrentSite() {
    let urlMatch = DATA_ARRAY.sites.find(element => {
        if (currentUrl.match(element.url)) {
            dbg(element, currentUrl, element.url)
            return true
        }
    })
    if (urlMatch) {
        if (urlMatch.deleted) removeElement(urlMatch.deleted, urlMatch.deleteMultiply)
        if (urlMatch.append) appendElement(urlMatch.append)
    }
}

function appendElement(elements) {
    elements.forEach((element) => {
        let DOMpreloader = setInterval(function () {
            let changeObject = document.querySelector(Object.keys(element)[0])
            if (changeObject !== null) {
                clearInterval(DOMpreloader);
                if (changeObject.lastChild.outerHTML != Object.values(element)[0]) {
                    changeObject.insertAdjacentHTML('beforeend', Object.values(element)[0])
                }
            }
        }, 10);

    })
}

function removeElement(elements, delM = 1) {
    for (let i = 0; i < delM; i++) {
        elements.forEach((element) => {
            let DOMpreloader = setInterval(function () {
                if (document.querySelector(element) !== null) {
                    clearInterval(DOMpreloader);
                    document.querySelector(element).remove()
                }
            }, 10);

        })
    }

}

function dbg(...msg) {
    console.log(...msg)
}