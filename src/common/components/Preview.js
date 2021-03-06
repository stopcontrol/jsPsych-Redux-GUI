import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var s = '<!doctype html>\
<html lang="en">\
  <head>\
    <meta charset="utf-8">\
    <meta name="viewport" content="width=device-width, initial-scale=1">\
    <script src="jsPsych/jspsych.js"></script>\
    <script src="jsPsych/plugins/jspsych-text.js"></script>\
    <script src="jsPsych/plugins/jspsych-single-stim.js"></script>\
    <link href="jsPsych/css/jspsych.css" rel="stylesheet" type="text/css"></link>\
    <script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>\
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>\
  </head>\
  \
  <body class=\'canvas\'>\
    <div id="container"></div>\
  </body>\
  <script>var hello_trial = {\
        type: \'text\',\
        text: \'Hello world!\'\
    };\
    jsPsych.init({\
        timeline: [ hello_trial ]})</script>\
  <!-- <script src="/static/bundle.js"></script> -->\
</html>\
\
'

export default class Preview extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {

		return (
  			<div style={{paddingTop: 30, textAlign: 'center', height: "100%", width: "100%", overflowY: 'auto'}}>
          <iframe width="80%" height="80%" srcDoc={s} disabled={true}/> 
        </div>
  		);
	}
}
