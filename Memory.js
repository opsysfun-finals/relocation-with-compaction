const Job = require("./Job.js");

class Memory {
    constructor(totalMemorySize, osSize, jobList) {
        this.totalMemorySize = totalMemorySize;
        this.osSize = osSize;
        this.queue = jobList;

        // Remaining available size of memory
        this.availableSize = this.totalMemorySize - this.osSize;
        
        // Representation of the physical RAM
        this.wholeMemory = new Array();
    }

    initialAllocation() {
        // Iterate through the queue
        let i = 0;
        while (i < this.queue.length) {
            // Determine if job can fit in memory
            if (this.queue.length[i].jobSize < this.availableSize) {
                // push to memory if it can fit
                this.wholeMemory.push(this.queue.length[i]);

                // Dequeue job
                this.queue = this.queue;
            }
        }
    }
}