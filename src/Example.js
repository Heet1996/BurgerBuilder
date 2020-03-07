function roadsAndLibraries(n, c_lib, c_road, cities) {

    let m=cities.length;  //no of roads
    let adjacencyList={};
    let visited={};
    for(let i=0;i<cities.length;i++)
    {
        if(!adjacencyList[cities[i][0]]) adjacencyList[cities[i][0]]=[];
        if(!adjacencyList[cities[i][1]]) adjacencyList[cities[i][1]]=[];
        adjacencyList[cities[i][0]].push(cities[i][1]);
        adjacencyList[cities[i][1]].push(cities[i][0]);
        visited[cities[i][0]]=false;
        visited[cities[i][1]]=false;
    }

    console.log(adjacencyList);
}
roadsAndLibraries(5,3,3,[[1,3],[3,4],[2,4],[1,2],[2,3],[5,6]]);