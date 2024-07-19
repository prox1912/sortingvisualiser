function startSorting() {
    const input = document.getElementById('array-input').value;
    const array = input.split(',').map(Number);
    const algorithm = document.getElementById('algorithm-select').value;
    visualizeSorting(array, algorithm);
}

async function visualizeSorting(array, algorithm) {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    const bars = [];

    // Create bars
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        container.appendChild(bar);
        bars.push(bar);
    });

    switch (algorithm) {
        case 'bubbleSort':
            await bubbleSort(array, bars);
            break;
        case 'selectionSort':
            await selectionSort(array, bars);
            break;
        case 'insertionSort':
            await insertionSort(array, bars);
            break;
        case 'quickSort':
            await quickSort(array, bars, 0, array.length - 1);
            break;
        case 'heapSort':
            await heapSort(array, bars);
            break;
        case 'mergeSort':
            await mergeSort(array, bars, 0, array.length - 1);
            break;
        // Add more cases here for other sorting algorithms
    }
}

async function bubbleSort(array, bars) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Swap
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Update bars
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;

                bars[j].style.backgroundColor = 'red';
                bars[j + 1].style.backgroundColor = 'red';

                await new Promise(resolve => setTimeout(resolve, 300));

                bars[j].style.backgroundColor = '#4caf50';
                bars[j + 1].style.backgroundColor = '#4caf50';
            }
        }
    }
}

async function selectionSort(array, bars) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            // Swap
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;

            // Update bars
            bars[i].style.height = `${array[i] * 3}px`;
            bars[minIndex].style.height = `${array[minIndex] * 3}px`;

            bars[i].style.backgroundColor = 'red';
            bars[minIndex].style.backgroundColor = 'red';

            await new Promise(resolve => setTimeout(resolve, 300));

            bars[i].style.backgroundColor = '#4caf50';
            bars[minIndex].style.backgroundColor = '#4caf50';
        }
    }
}

async function insertionSort(array, bars) {
    const n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 3}px`;

            bars[j + 1].style.backgroundColor = 'red';
            await new Promise(resolve => setTimeout(resolve, 300));
            bars[j + 1].style.backgroundColor = '#4caf50';

            j--;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;

        bars[j + 1].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, 300));
        bars[j + 1].style.backgroundColor = '#4caf50';
    }
}

async function quickSort(array, bars, low, high) {
    if (low < high) {
        let pi = await partition(array, bars, low, high);

        await quickSort(array, bars, low, pi - 1);
        await quickSort(array, bars, pi + 1, high);
    }
}

async function partition(array, bars, low, high) {
    let pivot = array[high];
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        if (array[j] < pivot) {
            i++;
            // Swap array[i] and array[j]
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            // Update bars
            bars[i].style.height = `${array[i] * 3}px`;
            bars[j].style.height = `${array[j] * 3}px`;

            bars[i].style.backgroundColor = 'red';
            bars[j].style.backgroundColor = 'red';
            await new Promise(resolve => setTimeout(resolve, 300));
            bars[i].style.backgroundColor = '#4caf50';
            bars[j].style.backgroundColor = '#4caf50';
        }
    }

    // Swap pivot element
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;

    bars[i + 1].style.height = `${array[i + 1] * 3}px`;
    bars[high].style.height = `${array[high] * 3}px`;

    bars[i + 1].style.backgroundColor = 'red';
    bars[high].style.backgroundColor = 'red';
    await new Promise(resolve => setTimeout(resolve, 300));
    bars[i + 1].style.backgroundColor = '#4caf50';
    bars[high].style.backgroundColor = '#4caf50';

    return i + 1;
}

async function heapSort(array, bars) {
    let n = array.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, bars, n, i);
    }

    // Extract elements
    for (let i = n - 1; i >= 0; i--) {
        // Move current root to end
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        // Update bars
        bars[0].style.height = `${array[0] * 3}px`;
        bars[i].style.height = `${array[i] * 3}px`;

        bars[0].style.backgroundColor = 'red';
        bars[i].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, 300));
        bars[0].style.backgroundColor = '#4caf50';
        bars[i].style.backgroundColor = '#4caf50';

        await heapify(array, bars, i, 0);
    }
}

async function heapify(array, bars, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest])
        largest = left;

    if (right < n && array[right] > array[largest])
        largest = right;

    if (largest != i) {
        let swap = array[i];
        array[i] = array[largest];
        array[largest] = swap;

        // Update bars
        bars[i].style.height = `${array[i] * 3}px`;
        bars[largest].style.height = `${array[largest] * 3}px`;

        bars[i].style.backgroundColor = 'red';
        bars[largest].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, 300));
        bars[i].style.backgroundColor = '#4caf50';
        bars[largest].style.backgroundColor = '#4caf50';

        await heapify(array, bars, n, largest);
    }
}

async function mergeSort(array, bars, left, right) {
    if (left >= right) {
        return;
    }
    const middle = left + Math.floor((right - left) / 2);
    await mergeSort(array, bars, left, middle);
    await mergeSort(array, bars, middle + 1, right);
    await merge(array, bars, left, middle, right);
}

async function merge(array, bars, left, middle, right) {
    const n1 = middle - left + 1;
    const n2 = right - middle;

    const leftArray = new Array(n1);
    const rightArray = new Array(n2);

    for (let i = 0; i < n1; i++) {
        leftArray[i] = array[left + i];
    }
    for (let i = 0; i < n2; i++) {
        rightArray[i] = array[middle + 1 + i];
    }

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            bars[k].style.height = `${array[k] * 3}px`;
            bars[k].style.backgroundColor = 'red';
            await new Promise(resolve => setTimeout(resolve, 300));
            bars[k].style.backgroundColor = '#4caf50';
            i++;
        } else {
            array[k] = rightArray[j];
            bars[k].style.height = `${array[k] * 3}px`;
            bars[k].style.backgroundColor = 'red';
            await new Promise(resolve => setTimeout(resolve, 300));
            bars[k].style.backgroundColor = '#4caf50';
            j++;
        }
        k++;
    }

    while (i < n1) {
        array[k] = leftArray[i];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, 300));
        bars[k].style.backgroundColor = '#4caf50';
        i++;
        k++;
    }

    while (j < n2) {
        array[k] = rightArray[j];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, 300));
        bars[k].style.backgroundColor = '#4caf50';
        j++;
        k++;
    }
}

