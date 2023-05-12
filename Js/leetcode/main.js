
document.getElementById("containsduplicate").addEventListener('click', () => containsduplicateRun())

function containsduplicateRun() {
    const numsArray = [
        {
            nums: [1,2,3,1]
        },
        {
            nums: [1,2,3,4]
        },
        {
            nums: [1,1,1,3,3,4,3,2,4,2]
        }
    ];

    numsArray.forEach(numArray => {
        console.log(containsduplicate(numArray.nums))
    })

}

function containsduplicate(nums) {
    let found = false;
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i === j) continue
            if (nums[i] === nums[j]) {
                found = true;
                break;
            }
        }
        if (found) break;
    }
    return found;
}

