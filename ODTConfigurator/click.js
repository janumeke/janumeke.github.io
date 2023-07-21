function CapitalizeOnlyFirstLetter(string) {
    if(typeof string != 'string')
        string = String(string);
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function PrettifyXML(element){
    const indent = '    ';
    let xml = `<${element.tagName}`;
    const attributes = Array.from(element.attributes);
    attributes.forEach((attr) => xml += ` ${attr.name}="${attr.value}"`);
    const children = Array.from(element.children);
    if(children.length == 0)
        xml += '/>';
    else{
        xml += '>\n';
        children.forEach((child) => {
            let lines = PrettifyXML(child).split('\n');
            lines = lines.map(line => indent + line);
            xml += `${lines.join('\n')}\n`;
        });
        xml += `</${element.tagName}>`;
    }
    return xml;
}

document.addEventListener('DOMContentLoaded', () => {
    let downloadUrl;

    document.querySelector('#generateBtn').addEventListener('click', () => {
        const xmlDoc = document.implementation.createDocument('', 'Configuration');
        const configurationElement = xmlDoc.getElementsByTagName('Configuration')[0];
        
        const addElement = xmlDoc.createElement('Add');

        const source = document.querySelector('#source');
        if(source.value)
            addElement.setAttribute(source.name, source.value);
        const version = document.querySelector('#version');
        if(version.value)
            addElement.setAttribute(version.name, version.value);
        const edition = document.querySelector('#edition');
        addElement.setAttribute(edition.name, edition.value);
        const channel = document.querySelector('#channel');
        addElement.setAttribute(channel.name, channel.value);
        const downloadPath = document.querySelector('#download');
        if(downloadPath.value)
            addElement.setAttribute(downloadPath.name, downloadPath.value);
        const cdnFallback = document.querySelector('#cdnFallback');
        addElement.setAttribute(cdnFallback.name, CapitalizeOnlyFirstLetter(cdnFallback.checked));

        configurationElement.append(addElement);

        const productElement = xmlDoc.createElement('Product');

        const productID = document.querySelector('#productID');
        let productID_value = '';
        for(let select = productID, options = PRODUCT_ID; select && options; options = options[select.value].options, select = select.nextElementSibling){
            if(typeof options[select.value] == 'string')
                productID_value += options[select.value];
            if(typeof options[select.value] == 'object')
                productID_value += options[select.value].value;
        }
        productElement.setAttribute(productID.name, productID_value);

        addElement.append(productElement);

        const languageElement = xmlDoc.createElement('Language');

        const languageID = document.querySelector('#languageID');
        languageElement.setAttribute(languageID.name, LANGUAGE_ID[languageID.value]);

        productElement.append(languageElement);

        const displayElement = xmlDoc.createElement('Display');

        const display = document.querySelector('#display');
        displayElement.setAttribute(display.name, display.value);
        const eula = document.querySelector('#eula');
        displayElement.setAttribute(eula.name, String(eula.checked).toUpperCase());

        configurationElement.append(displayElement);

        const excludes = Array.from(document.querySelectorAll('#exclude input'));
        excludes.forEach((ex) => {
            if(ex.checked){
                const excludeAppElement = xmlDoc.createElement('ExcludeApp');
                excludeAppElement.setAttribute('ID', ex.name);
                productElement.append(excludeAppElement);
            }
        });

        const propertyElement = xmlDoc.createElement('Property');

        const pinTaskbar = document.querySelector('#pinTaskbar');
        propertyElement.setAttribute('Name', pinTaskbar.name);
        propertyElement.setAttribute('Value', String(pinTaskbar.checked).toUpperCase());

        configurationElement.append(propertyElement);

        const updatesElement = xmlDoc.createElement('Updates');

        const update = document.querySelector('#update');
        updatesElement.setAttribute(update.name, String(update.checked).toUpperCase());
        const updatePath = document.querySelector('#updatePath');
        if(updatePath.value)
            updatesElement.setAttribute(updatePath.name, updatePath.value);
        const updateChannel = document.querySelector('#updateChannel');
        updatesElement.setAttribute(updateChannel.name, updateChannel.value);

        configurationElement.append(updatesElement);

        let xml = new XMLSerializer().serializeToString(xmlDoc);
        const output = document.querySelector('#output');
        output.value = PrettifyXML(configurationElement);
        if(downloadUrl)
            URL.revokeObjectURL(downloadUrl);
        const data = new Blob([document.querySelector("#output").value], {type: "application/xml"});
        downloadUrl = URL.createObjectURL(data);
        document.querySelector('#copyBtn').disabled = false;
        document.querySelector('#downloadBtn').disabled = false;
    });

    document.querySelector("#copyBtn").addEventListener("click", () => {
        navigator.clipboard.writeText(document.querySelector("#output").value);
    });

    document.querySelector("#downloadBtn").addEventListener("click", () => {
        const anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = "configuration.xml";
        anchor.click();
    });
});