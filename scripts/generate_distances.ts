import * as fs from "fs";

interface Post {
    
};

fs.readFile("buildings.txt", (err, data) => {
	if (err) throw err;

	const lines = data.toString().replace(/\r\n/g, "\n").replace(/\n/g, "");
	
	for (let line of lines) {
		
	}
});
