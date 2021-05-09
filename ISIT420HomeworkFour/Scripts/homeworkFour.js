async function getData(url = '') {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });

    return response.json();
}

window.addEventListener('load', () => {
    // Request employees and stores
    populateSelect('employeeSelect', 'employees');
    populateSelect('storeSelect', 'stores');
});

/**
 * Populates the select options of the given select ID.
 * 
 * @param {string} selectId - The DOM ID of the select to populate with options.
 * @param {string} controllerName - The name of the controller to call.
 */
const populateSelect = async (selectId, controllerName) => {
    const { data } = await getData(`api/${controllerName}`);

    if (Array.isArray(data)) {
        const select = document.getElementById(selectId);

        for (const item of data) {
            select.options[select.options.length] = new Option(item);
        }
    }
}

document.getElementById('employeePerformance').addEventListener('submit', async ev => {
    ev.preventDefault();

    const successEl = document.getElementById('employeePerformanceMessage');
    const errorEl = document.getElementById('employeeError');
    const fullname = new FormData(ev.target).get('employee')

    try {
        const { sum } = await getData(`api/employees?fullName=${fullname}`);

        if (sum) {
            document.getElementById('employeePerformanceAmount').innerHTML = sum;
            successEl.style.visibility = 'visible';
            errorEl.style.visibility = 'hidden';
        } else {
            successEl.style.visibility = 'hidden';
            errorEl.style.visibility = 'visible';
        }
    } catch (e) {
        successEl.style.visibility = 'hidden';
        errorEl.style.visibility = 'visible';
    }
});

document.getElementById('storePerformance').addEventListener('submit', async ev => {
    ev.preventDefault();

    const successEl = document.getElementById('storePerformanceMessage');
    const errorEl = document.getElementById('storeError');
    const city = new FormData(ev.target).get('store');

    try {
        const { sum } = await getData(`api/stores?city=${city}`);

        if (sum) {
            document.getElementById('storePerformanceAmount').innerHTML = sum;
            successEl.style.visibility = 'visible';
            errorEl.style.visibility = 'hidden';
        } else {
            
            successEl.style.visibility = 'hidden';
            errorEl.style.visibility = 'visible';
        }
    } catch (e) {
        successEl.style.visibility = 'hidden';
        errorEl.style.visibility = 'visible';
    }
});