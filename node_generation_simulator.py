import random
import time

# Variables testing for
foriegn_spawn_rate = 0.48
connection_spawn_rate = 0.5

class Node:
    def __init__(self,type,max_connections):
        self.type = type
        self.max_connections = max_connections


def spawn_node(node,fr,cr):
    connections = 0
    for i in range(4):
        if random.random() < cr:
            connections += 1
    if node.type == 'settlement':
        if random.random() < fr:
            return Node('foriegn',connections)
        else:
            return Node('settlement',connections)
    else:
        return None
    
def run_simulation(count,fr,cr):
    results = []
    for i in range(count):
        initial_node = Node('settlement',3)

        nodes = [initial_node]
        settlement_count = 0
        foriegn_count = 0


        while nodes:
            if len(nodes) > 100:
                break
            node = nodes.pop(0)
            if node.type == 'settlement':
                settlement_count += 1
            else:
                foriegn_count += 1
                continue
            for i in range(node.max_connections):
                nodes.append(spawn_node(node,fr,cr))
        results.append([settlement_count,foriegn_count])
    count = 0
    for result in results:
        if result[0] + result[1] > 20 and result[0] + result[1] < 30 and result[0] >= 10 and result[1] >= 10:
            count += 1
    return count

result_string = ""

for cr in range(1,101):
    for fr in range(1,101):
        print(f"Running simulation for {fr} and {cr}")
        count = run_simulation(1000,fr/100,cr/100)
        result_string += f"{cr},{fr},{count}\n"

with open('results.txt', 'w') as f:
    f.write("cr,fr,count\n")
    f.write(result_string)

