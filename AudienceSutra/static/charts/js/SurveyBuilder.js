var jsonData = {
	section : [
		{
			name: "section",
			title: "",
			description: "",
			elements: [

			] 
		}
	]
} //Global Json


//Survey Properties
var surveyProperty = {
	short: {
		type: "short",
		name: "",
		title: "",
		isRequired: true,
		placeholder: "",
		max: "200",
		min: "0",
		tag: "Short Answer",
		setType: "textSet" 
	},
	para: {
		type: "para",
		name: "",
		title: "",
		isRequired: true,
		placeholder: "",
		max: "200",
		min: "0",
		tag: "Paragraph",
		setType: "textSet"
	},
	number: {
		type: "number",
		name: "",
		title: "",
		isRequired: true,
		placeholder: "",
		max: "200",
		min: "0",
		tag: "NUMBER",
		setType: "textSet"
	},
	time: {
		type: "time",
		name: "",
		title: "",
		isRequired: true,
		timeType: 24,
		tag: "Time",
		setType: "timeSet"
	},
	radio: {
		type: "radio",
		name: "",
		title: "",
		choices: [""],
		isRequired: true,
		tag: "radio",
		setType: "radioSet"
	},
	checkbox: {
		type: "checkbox",
		name: "",
		title: "",
		choices: [""],
		isRequired: true,
		tag: "checkbox",
		setType: "optionSet"
	},
	dropbox: {
		type: "dropbox",
		name: "",
		title: "",
		choices: [""],
		isRequired: true,
		tag: "dropbox",
		setType: "optionSet"
	},
	date: {
		type: "date",
		name: "",
		title: "",
		isRequired: true,
		tag: "Date Picker",
		setType: "dateSet"
	}
} 


//Add Input Types
function add(type) {
	var get_QuestionIndex = $(".lower > question").length;
	console.log(get_QuestionIndex);
	var tempProperty = newObj(surveyProperty[type]);
	tempProperty.name =  "q_"+(get_QuestionIndex);
	console.log(tempProperty);
	jsonData.section[0].elements.push(tempProperty);
	
	var getDOM = DOM(type, get_QuestionIndex, tempProperty, surveyProperty[type].setType);
	$(".lower").append(getDOM);
	$('html, body').animate({scrollTop:$(document).height()}, 'slow');
}


//Fetch Corresponding DOM 
function DOM(type, index, property, set) {
	var DOM = DOMObject[set] (type, index, property);
	return DOM;
}


$(document).ready(function(){
	//Delete Input Type
	$(".lower").on("click", ".survey_q_delete", function(){
		var indexDel = $(".lower .survey_q_delete").index(this);
		$(".lower question").eq(indexDel).remove();
		jsonData.section[0].elements.splice(indexDel, 1);

		for(i = 0; i < jsonData.section[0].elements.length; i++) {
			jsonData.section[0].elements[i].name = "q_"+i;
			$(".lower question").eq(i).attr('name', jsonData.section[0].elements[i].name);
			$(".lower #survey_qno").eq(i).html(i+1);

			var set = $(".lower question").eq(i).data("set");
			if(set === "optionSet"){
				$(".lower question:nth-child("+(i+1)+") .survey_add").attr("onclick", "addOption("+i+")");;
			}
		}
	});

	//Delete Options
	$(".lower").on("click", ".del", function(){
        var getIndex = $(this).parents("question").index();
		var indexDel = $(this).index();
		jsonData.section[0].elements[getIndex].choices.splice(indexDel, 1);
		$(this).parent(".option_set").remove();
	});

	//Fetch and store header to json
	$("#survey_header").keyup(function(e){
        var val = $(this).val();
        jsonData.section[0].title = val;
    });

	//Fetch and store description to json
    $("#survey_description").keyup(function(e){
        var val = $(this).val();
        jsonData.section[0].description = val;
    });

    //Fetch and store title to json
    $(".lower").on("keyup", ".survey_question", function(e){
        var val = $(this).val();
        var getIndex = $(this).parents("question").index();
        jsonData.section[0].elements[getIndex].title = val;
    });

    //Fetch and store placeholder to json
    $(".lower").on("keyup", ".survey_placeholder", function(e){
        var val = $(this).val();
        var getIndex = $(this).parents("question").index();
        jsonData.section[0].elements[getIndex].placeholder = val;
    });

    //Fetch and store max value to json
    $(".lower").on("keyup", ".survey_max", function(e){
        var val = $(this).val();
        var getIndex = $(this).parents("question").index();
        jsonData.section[0].elements[getIndex].max = val;
    });

    //Fetch and store min value to json
    $(".lower").on("keyup", ".survey_min", function(e){
        var val = $(this).val();
        var getIndex = $(this).parents("question").index();
        jsonData.section[0].elements[getIndex].min = val;
    });

    //Fetch and store isrequired to json
    $(".lower").on("click", ".survey_required", function(e){
        var val = $(this).is(":checked");
        var getIndex = $(this).parents("question").index();
        jsonData.section[0].elements[getIndex].isRequired = val;
    });

    //Fetch and store choices to json
    $(".lower").on("keyup", ".survey_text", function(e){
        var val = $(this).val();
        var queIndex = $(this).index();
        var getIndex = $(this).parents("question").index();
        jsonData.section[0].elements[getIndex].choices[queIndex] = val;
    });
});


//Add options 
function addOption(val) {
	var DOM = '<div class="option_set">\
					<input type="text" class="survey_text" placeholder="Options Here">\
					<i class="material-icons del">close</i>\
				</div>';
	$(".lower question:nth-child("+(val+1)+") .option_sets").append(DOM);
	var total = $(".lower question:nth-child("+(val+1)+") .option_sets .option_set").length;
	jsonData.section[0].elements[val].choices.push("");
}


//Make new copy of object
function newObj(mainObj) {
  	let objCopy = {}; 
  	let key;

  	for (key in mainObj) {
    	objCopy[key] = mainObj[key]; 
  	}
  	return objCopy;
}


//Set of DOMs
var DOMObject = {

	//TextBox type DOM
	textSet: function(type, index, property, set) { 
		var DOM = '<question data-type="'+property.type+'" name="'+property.name+'" data-set="'+property.setType+'"> \
				<div class="row"> \
					<div class="col-lg-1"> \
						<div class="box"> \
							<div class="qno" id="survey_qno"> \
								'+(index+1)+' \
							</div> \
						</div> \
					</div> \
					<div class="col-lg-11 main_seg"? \
						<div class="box"> \
							<input type="text" class="survey_question" placeholder="Question Here"><br> \
							<input type="text" class="survey_placeholder" placeholder="Placeholder Here"> \
						</div> \
					</div> \
				</div> \
				<div class="row requirments end-lg"> \
					<div class="col-lg-2 start-lg"> \
						<div class="box"> \
							Required \
							<label class="req"> \
							  <input type="checkbox" class="check survey_required" checked> \
							  <span class="checkmark"></span> \
							</label> \
						</div> \
					</div> \
					<div class="col-lg-3 start-lg"> \
						<div class="box"> \
							Max Length \
							<label class="req"> \
							 	<input type="number" class="box_input survey_max" placeholder="'+property.max+'"> \
							</label> \
						</div> \
					</div> \
					<div class="col-lg-3 start-lg"> \
						<div class="box"> \
							Min Length \
							<label class="req"> \
							 	<input type="number" class="box_input survey_min" placeholder="'+property.min+'"> \
							</label> \
						</div> \
					</div> \
					<div class="col-lg-3 right-lg"> \
						<div class="box"> \
							<label class="req"> \
								<a href="#delete"> \
									<i class="material-icons survey_q_delete">delete</i> \
								</a> \
							</label> \
							<button id="survey_type">'+property.tag+'</button> \
						</div> \
					</div> \
				</div> \
			</question>';
		return DOM;
	},

	//Time TextBox type DOM
	timeSet: function(type, index, property, set) {
		var DOM = '<question data-type="'+property.type+'" name="'+property.name+'" data-set="'+property.setType+'">\
					<div class="row">\
						<div class="col-lg-1">\
							<div class="box">\
								<div class="qno" id="survey_qno">\
									'+(index+1)+' \
								</div>\
							</div>\
						</div>\
						<div class="col-lg-11 main_seg">\
							<div class="box">\
								<input type="text" class="survey_question" placeholder="Question Here"><br>\
							</div>\
						</div>\
					</div>\
					<div class="row requirments end-lg">\
						<div class="col-lg-2 start-lg">\
							<div class="box">\
								Required\
								<label class="req">\
								  <input type="checkbox" class="check survey_required" checked>\
								  <span class="checkmark"></span>\
								</label>\
							</div>\
						</div>\
						<div class="col-lg-4 start-lg">\
							<div class="box">\
								24 Hours\
								<label class="req">\
								  <input type="checkbox" id="survey_time_hour" class="check" checked>\
								  <span class="checkmark"></span>\
								</label>\
							</div>\
						</div>\
						<div class="col-lg-5 right-lg">\
							<div class="box">\
								<label class="req">\
									<a href="#delete">\
										<i class="material-icons survey_q_delete">delete</i>\
									</a>\
								</label>\
								<button id="survey_type">'+property.tag+'</button>\
							</div>\
						</div>\
					</div>\
				</question>';
		return DOM;
	},

	//Date TextBox type DOM
	dateSet: function(type, index, property, set) {
		var DOM = '<question data-type="'+property.type+'" name="'+property.name+'" data-set="'+property.setType+'">\
					<div class="row">\
						<div class="col-lg-1">\
							<div class="box">\
								<div class="qno" id="survey_qno">\
									'+(index+1)+' \
								</div>\
							</div>\
						</div>\
						<div class="col-lg-11 main_seg">\
							<div class="box">\
								<input type="text" class="survey_question" placeholder="Question Here"><br>\
							</div>\
						</div>\
					</div>\
					<div class="row requirments end-lg">\
						<div class="col-lg-6 start-lg">\
							<div class="box">\
								Required\
								<label class="req">\
								  <input type="checkbox" class="check survey_required" checked>\
								  <span class="checkmark"></span>\
								</label>\
							</div>\
						</div>\
						<div class="col-lg-5 right-lg">\
							<div class="box">\
								<label class="req">\
									<a href="#delete">\
										<i class="material-icons survey_q_delete">delete</i>\
									</a>\
								</label>\
								<button id="survey_type">'+property.tag+'</button>\
							</div>\
						</div>\
					</div>\
				</question>';
		return DOM;
	},

	//Multi Options and Dropdown type DOM
	optionSet: function(type, index, property, set) {
		var DOM = '<question data-type="'+property.type+'" name="'+property.name+'" data-set="'+property.setType+'">\
					<div class="row">\
						<div class="col-lg-1">\
							<div class="box">\
								<div class="qno" id="survey_qno">\
									'+(index+1)+' \
								</div>\
							</div>\
						</div>\
						<div class="col-lg-11 main_seg">\
							<div class="box">\
								<input type="text" class="survey_question" placeholder="Question Here"><br>\
								<div class="option_sets">\
									<div class="option_set">\
										<input type="text" class="survey_text" placeholder="Options Here">\
										<i class="material-icons del">close</i>\
									</div>\
								</div> <br>\
								<button class="survey_add" onclick="addOption('+(index)+')">ADD</button>\
							</div>\
						</div>\
					</div>\
					<div class="row requirments end-lg">\
						<div class="col-lg-6 start-lg">\
							<div class="box">\
								Required\
								<label class="req">\
								  <input type="checkbox" class="check survey_required" checked>\
								  <span class="checkmark"></span>\
								</label>\
							</div>\
						</div>\
						<div class="col-lg-5 right-lg">\
							<div class="box">\
								<label class="req">\
									<a href="#delete">\
										<i class="material-icons survey_q_delete">delete</i>\
									</a>\
								</label>\
								<button id="survey_type">'+property.tag+'</button>\
							</div>\
						</div>\
					</div>\
				</question>';
		return DOM;
	},


	radioSet: function(type, index, property, set) {
		var DOM = '<question data-type="'+property.type+'" name="'+property.name+'" data-set="'+property.setType+'">\
					<div class="row">\
						<div class="col-lg-1">\
							<div class="box">\
								<div class="qno" id="survey_qno">\
									'+(index+1)+' \
								</div>\
							</div>\
						</div>\
						<div class="col-lg-11 main_seg">\
							<div class="box">\
								<input type="text" class="survey_question" placeholder="Question Here"><br>\
								<div class="option_sets">\
									<div class="option_set">\
										<input type="text" class="survey_text" placeholder="Options Here">\
										<div class="req" style="padding-left:0px;"> \
											<input style="position:static;" type="number" class="box_input survey_max" placeholder="Next Que"> \
										</div> \
										<i class="material-icons del">close</i>\
									</div>\
								</div> <br>\
								<button class="survey_add" onclick="addOption('+(index)+')">ADD</button>\
							</div>\
						</div>\
					</div>\
					<div class="row requirments end-lg">\
						<div class="col-lg-6 start-lg">\
							<div class="box">\
								Required\
								<label class="req">\
								  <input type="checkbox" class="check survey_required" checked>\
								  <span class="checkmark"></span>\
								</label>\
							</div>\
						</div>\
						<div class="col-lg-5 right-lg">\
							<div class="box">\
								<label class="req">\
									<a href="#delete">\
										<i class="material-icons survey_q_delete">delete</i>\
									</a>\
								</label>\
								<button id="survey_type">'+property.tag+'</button>\
							</div>\
						</div>\
					</div>\
				</question>';
		return DOM;
	}
}
