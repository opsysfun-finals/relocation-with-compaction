const Job = require("./Job.js");

class Memory {
    constructor(totalMemorySize, osSize, jobList) {
        this.totalMemorySize = totalMemorySize;
        this.osSize = osSize;
        this.queue = jobList;

        // Remaining available size of memory
        this.availableSize = this.totalMemorySize - this.osSize;
        
        // Representation of the physical RAM
        this.wholeMemory = [new Job("OS", this.osSize)];

        // Allocate jobs in queue to memory
        this.initialAllocation();
    }

    // Method used by constructor
    initialAllocation() {
        // Iterate through the queue
        let i = 0;
        while (i < this.queue.length) {
            // Determine if job can fit in memory
            if (this.queue[i].jobSize < this.availableSize) {
                // push to memory if it can fit
                this.wholeMemory.push(this.queue[i]);

                // Dequeue job
                this.availableSize -= this.queue[i].jobSize;
                this.queue = this.queue.slice(0, i).concat(this.queue.slice(i+1));
            } else {
                i++;
            }
        }
        this.wholeMemory.push(new Job("free", this.availableSize));
    }

    /*  
        Deallocates jobs in memory
        Don't forget to implement a try catch for when user inputs index beyond array length
        Also update to disallow the removal of OS 
    */
    deallocate(deallocateList) { // indexes of jobs!
        for (let i = 0; i < deallocateList.length; i++) {
            if (this.wholeMemory[deallocateList[i]].jobName != "free") {
                this.wholeMemory[deallocateList[i]].jobName = "free";
                this.availableSize += this.wholeMemory[deallocateList[i]].jobSize;
            }
        }
    }

    /*
        Compacts free space in memory
        This code works for some reason
    */
    compaction() {
        let currentJob;
        let i = 0;
        
        /*
        let freeInLast = this.wholeMemory.pop();
        is this even necessary?????
        */

        while (i < this.wholeMemory.length) {
            currentJob = this.wholeMemory[i];
            if (currentJob.jobName === "free") {
                // Add free space to total available memory
                //this.availableSize += currentJob.jobSize;

                // Move up the jobs
                this.wholeMemory = this.wholeMemory.slice(0, i).concat(this.wholeMemory.slice(i+1));
            } else {
                i++;
            }
        }
        // Add frame with size of remaining available space
        this.wholeMemory.push(new Job("free", this.availableSize));

        this.allocate();
    }

    /*
        Method accepts an array of jobs
    */
    allocate() {
        let i = 0;
        let currentJob;
        let freePart;
        // Iterate through the queue
        while (i < this.queue.length) {
            currentJob = this.queue[i];

            // Check if currentJob can fit in the memory
            if (currentJob.jobSize <= this.availableSize) {
                // Remove the free space at the end of the memory
                freePart = this.wholeMemory.pop();

                this.wholeMemory.push(currentJob);

                // Remove currentJob from queue
                this.queue = this.queue.splice(0, i).concat(this.queue.splice(i+1));

                // Decrease total free space of memory
                this.availableSize -= currentJob.jobSize;

                freePart.jobSize = this.availableSize;
                this.wholeMemory.push(freePart);
                
            // If job does not fit increment to next job
            } else {
                i++;
            }
        }
    }

    // Method to show jobs allocated in memory
    viewMemory() {
        console.log("Memory");
        for (let i = 0; i < this.wholeMemory.length; i++) {
            console.log(this.wholeMemory[i].jobName + " " + this.wholeMemory[i].jobSize);
        }
    }

    // Method to show jobs in queue
    viewQueue() {
        console.log("Queue");
        for (let i = 0; i < this.queue.length; i++) {
            console.log(this.queue[i].jobName + " " + this.queue[i].jobSize);
        }
    }
}

module.exports = Memory;