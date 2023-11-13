const Job = require("./Job.js");

class Memory {
    constructor(totalMemorySize, osSize, jobList) {
        this.totalMemorySize = totalMemorySize;
        this.osSize = osSize;
        this.queue = jobList;

        // Remaining available size of memory
        this.availableSize = this.totalMemorySize - this.osSize;
        
        // Representation of the physical RAM
        this.wholeMemory = [];
    }

    initialAllocation() {
        // Iterate through the queue
        let i = 0;
        while (i < this.queue.length) {
            // Determine if job can fit in memory
            if (this.queue[i].jobSize < this.availableSize) {
                // push to memory if it can fit
                this.wholeMemory.push(this.queue[i]);

                // Dequeue job
                // this.waitingQueue = this.waitingQueue.slice(0, idx).concat(this.wholeMemory.slice(idx+1));
                this.availableSize -= this.queue[i].jobSize;
                this.queue = this.queue.slice(0, i).concat(this.queue.slice(i+1));
            } else {
                i++;
            }
        }
    }
}

module.exports = Memory;