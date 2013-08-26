var fs = require('fs');
/*
 * GET home page.
 */

exports.index = function(req, res){
  	res.render('index', { title: 'Express' });
};
exports.complain = function(req, res){
// Step 1 parse the GET queries
// Step 2 read in the complaint sentences from sentence.txt
// Step 3 replace patterns with constructed variables
// Step 4 render complaint
	// res.json(req.query);
	// Step 1
	var text = ""
		, firstName = req.query['_FNAME_']
		, lastName = req.query['_LNAME_']
		, sex = req.query['_SEX_']
		, complaintLength = req.query['_SENTENCES_']
		, name = firstName + " " + lastName;
	var pro = {
		_HESHE_: "",
		_HIMHER_: "",
		_HISHER_: ""
	};
	if (sex == 'Male'){
		pro['_HESHE_'] = "he";
		pro['_HIMHER_'] = "him";
		pro['_HISHER_'] = "his";
	} else if (sex == 'Female') {
		pro['_HESHE_'] = "she";
		pro['_HIMHER_'] = "her";
		pro['_HISHER_'] = "her";
	} else {
		res.json({error: "No sex given"});
	}

	// Step 2
	// Read in the text file and construct the letter based on random numbers
	// used readFileSync because it is straight forward. Otherwise, use readFile
	// and inside the callback replace the patterns and render the template
	var sentences = fs.readFileSync('./sentence.txt').toString().split(/\r?\n|\r/);
	for (var i = 0;i<complaintLength;i++){
		var temp = Math.floor(Math.random()*40);
		text = text + sentences[temp];
	}
	// Step 3 
	// Some regex to replace patterns
	text = text.replace(/_FNAME_/g, firstName).replace(/_LNAME_/g, lastName)
		.replace(/_NAME_/g, name).replace(/_HESHE_/g, pro['_HESHE_'])
		.replace(/_HIMHER/g, pro['HIMHER']).replace(/_HISHER_/g, pro['_HISHER']);

	// Step 4
	// render the complaint
	res.render('complaint',{letter: text});
};