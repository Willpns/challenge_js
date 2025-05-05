const money = {
    dollar: 0.84,
    euro: 1,
    livre: 1.14,
    bitcoin: 40000
};

let selectedEntryCurrency = "euro";
let selectedOutputCurrency = "euro";

function formatResult(value) {
    if (Number.isInteger(value)) {
        return value.toString(); 
    } else {
        let formatted = value.toFixed(10).replace(/0+$/, ''); 
        if (formatted.endsWith('.')) {
            formatted = formatted.slice(0, -1);
        }
        return formatted;
    }
}

function convertCurrency() {
    const entryValue = parseFloat(document.getElementById("entry").value) || 0;
    const result = (money[selectedEntryCurrency] * entryValue) / money[selectedOutputCurrency];

    document.getElementById("result").value = formatResult(result);
}

function selectCurrency(element, isEntry) {
    const currency = element.dataset.devise;

    if (isEntry) {
        selectedEntryCurrency = currency;
        document.querySelectorAll("#entry_div .butt").forEach(btn => btn.style.backgroundColor = "gray");
    } else {
        selectedOutputCurrency = currency;
        document.querySelectorAll("#output_div .butt").forEach(btn => btn.style.backgroundColor = "gray");
    }

    element.style.backgroundColor = "rgb(0, 94, 0)"; 
    convertCurrency(); 
}

document.getElementById("entry").addEventListener("change", convertCurrency);