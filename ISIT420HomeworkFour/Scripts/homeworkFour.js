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





document.getElementById('getURate').addEventListener('click', async ev => {

    const successEl = document.getElementById('urateMessage');
    const errorEl = document.getElementById('urateError');

    try {
        const { stores } = await getData(`api/urate`);

        if (stores) {
            // Clear the previous list items so we don't continue
            // to get duplicates with each click of the button.
            successEl.innerHTML = '';
            stores.forEach(function (store) {
                const li = document.createElement('li');
                li.innerHTML = "Year: " + store.city + ", Month: " + store.total + ", Rate:";
                successEl.appendChild(li);
            });
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