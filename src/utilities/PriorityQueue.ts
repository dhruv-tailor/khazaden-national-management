interface Item<T> {
    item: T
    priority: number
}

export class PriorityQueue<T> {
    private elements: Item<T>[]
    
    constructor() {
        this.elements = []
    }  
    
    empty(): boolean {
        return this.elements.length === 0
    }

    put(item: T, priority: number) {
        heapPush(this.elements, {item, priority})
    }

    get(): T {
        return heapPop(this.elements).item
    }
}

// Push an item into the heap
const heapPush = (heap: Item<any>[], item: Item<any>) => {
    heap.push(item)
    siftDown(heap,0,heap.length - 1)
}

// Moves the item down the tree to its correct position
const siftDown = (heap: Item<any>[], startPos: number, pos: number) => {
    const newItem = heap[pos]
    while(pos > startPos) {
        const parentPos = (pos - 1) >> 1
        const parent = heap[parentPos]
        if (parent.priority < newItem.priority) {
            heap[pos] = parent
            pos = parentPos
            continue
        }
        break
    }
    heap[pos] = newItem
}

// Popos the smallest item in the heap
const heapPop = (heap: Item<any>[]): Item<any> => {
    const lastelt = heap.pop()
    if (heap.length === 0) { return lastelt! }
    const return_item = heap[0]
    heap[0] = lastelt!
    siftUp(heap, 0)
    return return_item
}

const siftUp = (heap: Item<any>[], pos: number) => {
    const end_pos = heap.length
    const start_pos = pos
    const new_item = heap[pos]
    let child_pos = 2 * pos + 1 // leftmost child position
    while(child_pos < end_pos) {
        // gets the smaller child
        const right_pos = child_pos + 1
        if ((right_pos < end_pos) && !(heap[child_pos].priority < heap[right_pos].priority)) {
            child_pos = right_pos
        }
        // move the smaller child up
        heap[pos] = heap[child_pos]
        pos = child_pos
        child_pos = 2 * pos + 1
    }
    // moves the nodes down
    heap[pos] = new_item
    siftDown(heap, start_pos, pos)
}
