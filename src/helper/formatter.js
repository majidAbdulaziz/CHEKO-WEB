const Formatter =
{
    numberToStringWithCurrency: function (amount, withDecimals, currencyCode, dirCode, langCode) {
        
        var placementKey = "placement_" + dirCode;
        var symbolKey = "symbol_" + langCode;

        var options = 
        {
            "sar":{"placement_ltr":"before",
                    "placement_rtl":"after",
                    "symbol_default":" SR ",
                    "symbol_ar":" ر.س. ",
                    "rate":1},
                    
            "usd":{"placement_ltr":"before",
                    "placement_rtl":"before",
                    "symbol_default":" $ ",
                    "symbol_ar":" $ ",
                    "rate":0.266},

            "eur":{"placement_ltr":"before",
                    "placement_rtl":"before",
                    "symbol_default":" € ",
                    "symbol_ar":" يورو ",
                    "rate":0.266},

            "aed":{"placement_ltr":"before",
                "placement_rtl":"before",
                "symbol_default":" AED ",
                "symbol_ar":" د.إ. ",
                "rate":0.266},

            "bhd":{"placement_ltr":"before",
                "placement_rtl":"before",
                "symbol_default":" BHD ",
                "symbol_ar":" د.ب. ",
                "rate":0.266},

            "kwd":{"placement_ltr":"before",
                "placement_rtl":"before",
                "symbol_default":" KWD ",
                "symbol_ar":" د.ك.",
                "rate":0.266},

            "omr":{"placement_ltr":"before",
                "placement_rtl":"before",
                "symbol_default":" OMR ",
                "symbol_ar":" ر.ع. ",
                "rate":0.266}
        };
        
        if(options[currencyCode] !== undefined)
        {
            var placement = options[currencyCode]["placement_rtl"];
            var symbol = options[currencyCode]["symbol_default"];

            if(options[currencyCode][placementKey] !== undefined)
            {
                placement = options[currencyCode][placementKey];
            }

            if(options[currencyCode][symbolKey] !== undefined)
            {
                symbol = options[currencyCode][symbolKey];
            }

            var amountFormatted = parseFloat(amount)*options[currencyCode]["rate"];

            if(withDecimals)
            {
                amountFormatted = this.stringToNumberWithCommasAndDicimals(amountFormatted);
            }
            else{
                amountFormatted = this.stringToNumberWithCommas(amountFormatted);
            }

            if(placement === "before")
            {
                return symbol + amountFormatted; 
            }
            else
            {
                return amountFormatted + symbol; 
            }
        }
        else{
            return amount;
        }
    },

    stringToNumberWithCommas: function (number) 
    {
        if (number !== undefined && number !== null)
        {
            return parseFloat(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else{
            return "";
        }
    },

    stringToNumberWithCommasAndDicimals: function (number)
    {
        if (number !== undefined && number !== null)
        {
            return number.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        else{
            return "";
        }
    }
    
}

export default Formatter;