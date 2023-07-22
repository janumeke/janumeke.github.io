function CapitalizeOnlyFirstLetter(string) {
    if(typeof string != 'string')
        string = String(string);
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const INDENT = '    ';
function PrettifyXML(element){
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
            lines = lines.map(line => INDENT + line);
            xml += `${lines.join('\n')}\n`;
        });
        xml += `</${element.tagName}>`;
    }
    return xml;
}

document.addEventListener('DOMContentLoaded', () => {
    const source = document.querySelector('#source');
    const version = document.querySelector('#version');
    const edition = document.querySelector('#edition');
    const channel = document.querySelector('#channel');
    const download = document.querySelector('#download');
    const cdnFallback = document.querySelector('#cdnFallback');
    const productID = document.querySelector('#productID');
    const languageID = document.querySelector('#languageID');
    const display = document.querySelector('#display');
    const eula = document.querySelector('#eula');
    const pinTaskbar = document.querySelector('#pinTaskbar');
    const update = document.querySelector('#update');
    const updatePath = document.querySelector('#updatePath');
    const updateChannel = document.querySelector('#updateChannel');
    const output = document.querySelector('#output');
    let downloadUrl;

    document.querySelector('#generateBtn').addEventListener('click', () => {
        const xmlDoc = document.implementation.createDocument('', 'Configuration');
        const configurationElement = xmlDoc.getElementsByTagName('Configuration')[0];
        
        const addElement = xmlDoc.createElement('Add');
        if(source.value)
            addElement.setAttribute(source.name, source.value);
        if(version.value)
            addElement.setAttribute(version.name, version.value);
        addElement.setAttribute(edition.name, edition.value);
        addElement.setAttribute(channel.name, channel.value);
        if(download.value)
            addElement.setAttribute(download.name, download.value);
        addElement.setAttribute(cdnFallback.name, CapitalizeOnlyFirstLetter(cdnFallback.checked));
        configurationElement.append(addElement);

        const productElement = xmlDoc.createElement('Product');
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
        languageElement.setAttribute(languageID.name, LANGUAGE_ID[languageID.value]);
        productElement.append(languageElement);

        const displayElement = xmlDoc.createElement('Display');
        displayElement.setAttribute(display.name, display.value);
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
        propertyElement.setAttribute('Name', pinTaskbar.name);
        propertyElement.setAttribute('Value', String(pinTaskbar.checked).toUpperCase());
        configurationElement.append(propertyElement);

        const updatesElement = xmlDoc.createElement('Updates');
        updatesElement.setAttribute(update.name, String(update.checked).toUpperCase());
        if(update.checked){
            if(updatePath.value)
                updatesElement.setAttribute(updatePath.name, updatePath.value);
            updatesElement.setAttribute(updateChannel.name, updateChannel.value);
        }
        configurationElement.append(updatesElement);

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

    const downloadLink = document.createElement("a");
    document.querySelector("#downloadBtn").addEventListener("click", () => {
        downloadLink.href = downloadUrl;
        downloadLink.download = "configuration.xml";
        downloadLink.click();
    });
});