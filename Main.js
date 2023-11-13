const Memory = require('./Memory.js');
const Job = require("./Job.js");

function main() {
    const jobList = [new Job("job1", 100), new Job("job2", 200), new Job("job3", 300)];
    ram = new Memory(500, 100, jobList);
    ram.viewMemory();
    ram.viewQueue();

    console.log("\nDeallocation");
    ram.deallocate([1]);
    ram.viewMemory();
    
    console.log("\nCompaction");
    ram.compaction();
    ram.viewMemory();
}

main();
