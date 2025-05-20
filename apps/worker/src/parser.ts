export function Parse(text: String, values: any, start = "{", end = "}") {
    let startind = 0;
    let endind = 1;
    let final = "";
    while (endind < text.length) {
        if (text[startind] == start) {
            let endpoint = startind + 2;
            while (text[endpoint] !== end) {
                endpoint++;
            }
            let stringHolding = text.slice(startind + 1, endpoint);
            const key = stringHolding.split(".");
            let localvalue = {
                ...values

            }
            for (let i = 0; i < key.length; i++){
                if (typeof localvalue == "string") {
                    localvalue = JSON.parse(localvalue);
                }
                localvalue = localvalue[key[i]];
            }
            final +=
                localvalue;
            startind = endpoint + 2;
            endind = endind + 2;
        }
        else {
            final += text[startind];
            startind++;
            endind++;
        }

    }
    if (text[startind]) {
        final += text[startind];
    }
    return final;
}