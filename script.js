// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- DATA STORE ---
    // This object holds all the descriptive text for the theory panel.
    const theoryData = {
        bubble: { name: "Bubble Sort", description: "Bubble Sort is a simple comparison-based algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Larger elements 'bubble' to the end of the list.", pseudocode: "for i from 0 to n-1:\n   for j from 0 to n-i-1:\n      if arr[j] > arr[j+1]:\n         swap(arr[j], arr[j+1])", complexity: "Best Case: O(n)\nAverage Case: O(n²)\nWorst Case: O(n²)\nSpace: O(1)", stable: "Yes", useCase: "Educational purposes and very small datasets." },
        selection: { name: "Selection Sort", description: "Selection Sort repeatedly finds the minimum element from the unsorted part and puts it at the beginning. It divides the array into sorted and unsorted parts.", pseudocode: "for i from 0 to n-1:\n   min = i\n   for j from i+1 to n:\n      if arr[j] < arr[min]:\n         min = j\n   swap(arr[i], arr[min])", complexity: "Best Case: O(n²)\nAverage Case: O(n²)\nWorst Case: O(n²)\nSpace: O(1)", stable: "No", useCase: "When memory write is costly, as it makes minimum swaps." },
        insertion: { name: "Insertion Sort", description: "Insertion Sort builds the final sorted array one item at a time. It’s much like sorting playing cards in your hands.", pseudocode: "for i from 1 to n-1:\n   key = arr[i]\n   j = i - 1\n   while j >= 0 and arr[j] > key:\n      arr[j + 1] = arr[j]\n      j = j - 1\n   arr[j + 1] = key", complexity: "Best Case: O(n)\nAverage Case: O(n²)\nWorst Case: O(n²)\nSpace: O(1)", stable: "Yes", useCase: "Efficient for small datasets or nearly sorted data." },
        merge: { name: "Merge Sort", description: "Merge Sort is a divide-and-conquer algorithm. It splits the array into halves, recursively sorts them, and merges the sorted halves.", pseudocode: "mergeSort(arr, left, right):\n  if left < right:\n     mid = (left + right) / 2\n     mergeSort(arr, left, mid)\n     mergeSort(arr, mid + 1, right)\n     merge(arr, left, mid, right)", complexity: "Best Case: O(n log n)\nAverage Case: O(n log n)\nWorst Case: O(n log n)\nSpace: O(n)", stable: "Yes", useCase: "Large datasets where stability is important." },
        quick: { name: "Quick Sort", description: "Quick Sort is a divide-and-conquer algorithm. It picks a 'pivot' element, partitions the array around the pivot, and recursively sorts the sub-arrays.", pseudocode: "quickSort(arr, low, high):\n   if low < high:\n      pi = partition(arr, low, high)\n      quickSort(arr, low, pi - 1)\n      quickSort(arr, pi + 1, high)", complexity: "Best Case: O(n log n)\nAverage Case: O(n log n)\nWorst Case: O(n²)\nSpace: O(log n)", stable: "No", useCase: "Often the fastest in practice for large, unordered datasets." }
    };

    // --- APPLICATION STATE ---
    // We keep the raw numeric values in an array and a flag to prevent actions during sorting.
    let numericArray = [];
    let isSorting = false;

    // --- DOM ELEMENT REFERENCES ---
    // Getting all interactive elements from the page once.
    const visualizer = document.getElementById('visualizer');
    const generateBtn = document.getElementById('generate-btn');
    const sortBtn = document.getElementById('sort-btn');
    const algorithmSelect = document.getElementById('algorithm-select');
    const sizeRange = document.getElementById('size-range');
    const speedRange = document.getElementById('speed-range');
    const sizeValue = document.getElementById('size-value');

    // --- HELPER FUNCTIONS ---
    
    // A simple promise-based delay function to control animation speed.
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    // Functions to disable/enable controls to prevent user interference during sorting.
    function toggleControls(disabled) {
        isSorting = disabled;
        generateBtn.disabled = disabled;
        sortBtn.disabled = disabled;
        algorithmSelect.disabled = disabled;
        sizeRange.disabled = disabled;
    }

    // --- UI UPDATE FUNCTIONS ---

    // Updates the theory panel based on the selected algorithm.
    function updateTheoryPanel() {
        const selectedAlgo = algorithmSelect.value;
        const data = theoryData[selectedAlgo];
        document.getElementById('theory-name').innerText = data.name;
        document.getElementById('theory-desc').innerText = data.description;
        document.getElementById('theory-pseudo').innerText = data.pseudocode;
        document.getElementById('theory-complexity').innerText = data.complexity;
        document.getElementById('theory-stable').innerText = data.stable;
        document.getElementById('theory-usecase').innerText = data.useCase;
    }

    // Generates a new array of random numbers and creates the visual bars.
    function generateNewArray() {
        if (isSorting) return;
        
        numericArray = [];
        visualizer.innerHTML = ''; // Clear previous bars
        
        const size = sizeRange.value;
        const visualizerWidth = visualizer.offsetWidth;
        const visualizerHeight = visualizer.offsetHeight;
        const barWidth = Math.max(2, Math.floor((visualizerWidth - (size * 2)) / size));

        for (let i = 0; i < size; i++) {
            const value = Math.floor(Math.random() * (visualizerHeight - 20)) + 10;
            numericArray.push(value);
            
            const bar = document.createElement('div');
            bar.style.height = `${value}px`;
            bar.style.width = `${barWidth}px`;
            bar.style.backgroundColor = 'steelblue';
            bar.classList.add('bar', 'flex-shrink-0', 'mx-px', 'transition-colors', 'duration-300', 'ease-in-out', 'rounded-t-md');
            visualizer.appendChild(bar);
        }
    }

    // --- SORTING ALGORITHMS ---
    // Each algorithm directly manipulates the DOM bars for visualization.

    async function bubbleSort() {
        const bars = document.getElementsByClassName('bar');
        const n = bars.length;
        const speed = 250 / speedRange.value;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // Highlight bars being compared
                bars[j].style.backgroundColor = 'yellow';
                bars[j + 1].style.backgroundColor = 'yellow';
                await delay(speed);

                // If the left bar is greater, perform a swap
                if (numericArray[j] > numericArray[j + 1]) {
                    // Visually indicate the swap with red
                    bars[j].style.backgroundColor = 'red';
                    bars[j + 1].style.backgroundColor = 'red';
                    
                    // Swap the values in the numeric array
                    [numericArray[j], numericArray[j + 1]] = [numericArray[j + 1], numericArray[j]];
                    
                    // Update the heights of the DOM bars
                    bars[j].style.height = `${numericArray[j]}px`;
                    bars[j + 1].style.height = `${numericArray[j + 1]}px`;
                    await delay(speed);
                }

                // Reset colors to default
                bars[j].style.backgroundColor = 'steelblue';
                bars[j + 1].style.backgroundColor = 'steelblue';
            }
            // The last element in each pass is now in its correct sorted position
            bars[n - 1 - i].style.backgroundColor = 'green';
        }
        bars[0].style.backgroundColor = 'green'; // The first element is sorted by default at the end
    }

    async function selectionSort() {
        const bars = document.getElementsByClassName('bar');
        const n = bars.length;
        const speed = 250 / speedRange.value;

        for (let i = 0; i < n; i++) {
            let minIdx = i;
            // Mark the current element as the potential minimum
            bars[i].style.backgroundColor = 'orange';

            // Find the actual minimum in the rest of the array
            for (let j = i + 1; j < n; j++) {
                bars[j].style.backgroundColor = 'yellow'; // Highlight for comparison
                await delay(speed);
                if (numericArray[j] < numericArray[minIdx]) {
                    // If we found a new minimum, reset the old one's color
                    if (minIdx !== i) {
                        bars[minIdx].style.backgroundColor = 'steelblue';
                    }
                    minIdx = j;
                    // Highlight the new minimum
                    bars[minIdx].style.backgroundColor = 'orange';
                } else {
                    // If not the new minimum, reset its color
                    bars[j].style.backgroundColor = 'steelblue';
                }
            }

            // Swap the found minimum with the first element of the unsorted part
            [numericArray[i], numericArray[minIdx]] = [numericArray[minIdx], numericArray[i]];
            bars[i].style.height = `${numericArray[i]}px`;
            bars[minIdx].style.height = `${numericArray[minIdx]}px`;
            
            // The element at `i` is now sorted
            bars[minIdx].style.backgroundColor = 'steelblue';
            bars[i].style.backgroundColor = 'green';
            await delay(speed);
        }
    }

    async function insertionSort() {
        const bars = document.getElementsByClassName('bar');
        const n = bars.length;
        const speed = 250 / speedRange.value;
        bars[0].style.backgroundColor = 'green'; // First element is a sorted sub-array of size 1

        for (let i = 1; i < n; i++) {
            let key = numericArray[i];
            let j = i - 1;
            
            // Highlight the key element to be inserted
            bars[i].style.backgroundColor = 'yellow';
            await delay(speed);

            // Move elements of the sorted part that are greater than the key
            while (j >= 0 && numericArray[j] > key) {
                numericArray[j + 1] = numericArray[j];
                bars[j + 1].style.height = `${numericArray[j + 1]}px`;
                bars[j].style.backgroundColor = 'red'; // Show element being shifted
                await delay(speed);
                bars[j].style.backgroundColor = 'green'; // Return to sorted color
                j--;
            }
            // Place the key in its correct sorted position
            numericArray[j + 1] = key;
            bars[j + 1].style.height = `${key}px`;
            bars[j + 1].style.backgroundColor = 'green';
            await delay(speed);
        }
    }

    // Note: Recursive sorts like Merge and Quick sort are more complex to visualize.
    // They are implemented here with helper functions.

    async function mergeSort() {
        const speed = 250 / speedRange.value;
        const bars = document.getElementsByClassName('bar');

        async function merge(l, m, r) {
            const n1 = m - l + 1, n2 = r - m;
            let L = new Array(n1), R = new Array(n2);
            for (let i = 0; i < n1; i++) L[i] = numericArray[l + i];
            for (let j = 0; j < n2; j++) R[j] = numericArray[m + 1 + j];

            let i = 0, j = 0, k = l;
            while (i < n1 && j < n2) {
                if (bars[l+i]) bars[l+i].style.backgroundColor = 'yellow';
                if (bars[m+1+j]) bars[m+1+j].style.backgroundColor = 'yellow';
                await delay(speed);

                if (L[i] <= R[j]) {
                    numericArray[k] = L[i];
                    if (bars[l+i]) bars[l+i].style.backgroundColor = 'steelblue';
                    i++;
                } else {
                    numericArray[k] = R[j];
                    if (bars[m+1+j]) bars[m+1+j].style.backgroundColor = 'steelblue';
                    j++;
                }
                if (bars[k]) {
                    bars[k].style.height = `${numericArray[k]}px`;
                    bars[k].style.backgroundColor = 'red'; // Show merging
                    await delay(speed);
                    bars[k].style.backgroundColor = 'green';
                }
                k++;
            }
            while (i < n1) {
                numericArray[k] = L[i];
                if (bars[k]) { bars[k].style.height = `${numericArray[k]}px`; bars[k].style.backgroundColor = 'green'; }
                i++; k++;
            }
            while (j < n2) {
                numericArray[k] = R[j];
                if (bars[k]) { bars[k].style.height = `${numericArray[k]}px`; bars[k].style.backgroundColor = 'green'; }
                j++; k++;
            }
        }

        async function sort(l, r) {
            if (l >= r) {
                if(bars[l]) bars[l].style.backgroundColor = 'green';
                return;
            }
            const m = l + Math.floor((r - l) / 2);
            await sort(l, m);
            await sort(m + 1, r);
            await merge(l, m, r);
        }
        await sort(0, numericArray.length - 1);
    }

    async function quickSort() {
        const speed = 250 / speedRange.value;
        const bars = document.getElementsByClassName('bar');

        async function partition(low, high) {
            let pivot = numericArray[high];
            if (bars[high]) bars[high].style.backgroundColor = 'red'; // Pivot
            let i = low - 1;
            for (let j = low; j < high; j++) {
                if (bars[j]) bars[j].style.backgroundColor = 'yellow';
                await delay(speed);
                if (numericArray[j] < pivot) {
                    i++;
                    [numericArray[i], numericArray[j]] = [numericArray[j], numericArray[i]];
                    if (bars[i]) bars[i].style.height = `${numericArray[i]}px`;
                    if (bars[j]) bars[j].style.height = `${numericArray[j]}px`;
                    if (bars[i]) bars[i].style.backgroundColor = 'purple'; // Swapped
                    await delay(speed);
                    if (bars[i]) bars[i].style.backgroundColor = 'steelblue';
                }
                if (bars[j]) bars[j].style.backgroundColor = 'steelblue';
            }
            [numericArray[i + 1], numericArray[high]] = [numericArray[high], numericArray[i + 1]];
            if (bars[i + 1]) bars[i + 1].style.height = `${numericArray[i + 1]}px`;
            if (bars[high]) bars[high].style.height = `${numericArray[high]}px`;
            if (bars[high]) bars[high].style.backgroundColor = 'steelblue';
            if (bars[i + 1]) bars[i + 1].style.backgroundColor = 'green';
            await delay(speed);
            return i + 1;
        }

        async function sort(low, high) {
            if (low < high) {
                let pi = await partition(low, high);
                await sort(low, pi - 1);
                await sort(pi + 1, high);
            } else {
                if (low >= 0 && low < bars.length && bars[low]) {
                    bars[low].style.backgroundColor = 'green';
                }
            }
        }
        await sort(0, numericArray.length - 1);
    }

    // --- EVENT HANDLING ---
    
    // Main function to trigger the selected sorting algorithm.
    async function startSort() {
        toggleControls(true); // Disable UI
        
        const selectedAlgo = algorithmSelect.value;
        switch (selectedAlgo) {
            case 'bubble': await bubbleSort(); break;
            case 'selection': await selectionSort(); break;
            case 'insertion': await insertionSort(); break;
            case 'merge': await mergeSort(); break;
            case 'quick': await quickSort(); break;
        }

        // Final pass to ensure all bars are green after sorting completes
        const bars = document.getElementsByClassName('bar');
        for(let bar of bars) {
            bar.style.backgroundColor = 'green';
        }
        
        toggleControls(false); // Re-enable UI
    }

    // --- INITIALIZATION ---
    
    // Sets up all event listeners and generates the first array.
    function init() {
        generateBtn.addEventListener('click', generateNewArray);
        sortBtn.addEventListener('click', startSort);
        sizeRange.addEventListener('input', (e) => {
            sizeValue.innerText = e.target.value;
            generateNewArray();
        });
        algorithmSelect.addEventListener('change', updateTheoryPanel);
        window.addEventListener('resize', generateNewArray);
        
        updateTheoryPanel();
        setTimeout(generateNewArray, 150); // Initial array generation
    }

    // Start the application
    init();
});
