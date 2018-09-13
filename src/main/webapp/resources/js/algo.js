"use strict"
var algo = algo || {};
algo ={
		init : x=>{
			algo.onCreate(x);
			algo.setContentView();
		},
		onCreate :x=>{
			algo.router.onCreate(x);
		},
		setContentView : ()=>{
			$('#wrapper').empty();
		}
};
algo.main ={
		onCreate : ()=>{
			algo.main.setContentView();
		},
		setContentView : ()=>{
			$('#wrapper').html('<h1>알고리즘</h1><h3>수 열</h3><div id="ctn" >'
					+'<table id="tb1" style="width:800px;height:300px;'
					+'border-collapse: collapse;border : 1px solid black;margin:0 auto">'
					+'<tr style="border: 1px solid black;">'
					+'<td id="t_1" style="width: 50%; border: 1px solid black;"></td>'
					+'<td id="t_r" style="width: 50%; border: 1px solid black;"></td>'
					+'</tr>'
					+'</table>'
					+'</div>');
			let $t_1 = $('#t_1');
			let $t_r = $('#t_r');
			$("<ul />").attr({id : 'side_menu'}).addClass('list-group').appendTo($t_1);
			$('<li/>').attr({id: 'arith'}).addClass('list-group-item').appendTo($('#side_menu'));
			$('<a/>').attr({href : '#'}).html('등차수열의합').appendTo($('#arith'))
			.click(e=>{
				/*let ques = 
					'<div id="ques"><h3>시작값 x, 마지막값 y, 공차 d 인 등차수열의 합을 구하시오.</h3>'
					+'	<label for="시작값">시작값</label><input id="sta" type="text" value = ""></br>'
					+'	<label for="마지막값">마지막값</label><input id="end" type="text" value =""></br>'
					+'	<label for="공차">공차</label><input id="d" type="text" value=""></br>'
					+'	<button id="bt">결과보기</button>'
				    +'	<h6 id= "rs">결과보기</h6></div>'; */
				$('<div/>').attr({id:'ques'}).appendTo($t_r);
				$('<h3/>').html('시작값 x, 마지막값 y, 공차 d 인 등차수열의 합을 구하시오.').appendTo($('#ques'));
				$('<label/>').html('시작값').appendTo($('#ques'));
				$('<input/>').attr({id:'sta',type:'text'}).appendTo($('#ques'));
				$('<br/>').appendTo($('#ques'));
				$('<label/>').html('마지막값').appendTo($('#ques'));
				$('<input/>').attr({id:'end',type:'text'}).appendTo($('#ques'));
				$('<br/>').appendTo($('#ques'));
				$('<label/>').html('공차').appendTo($('#ques'));
				$('<input/>').attr({id:'d',type:'text'}).appendTo($('#ques'));
				$('<br/>').appendTo($('#ques'));
				$('<button/>').addClass('btn').html('결과보기.').appendTo($('#ques'))
				.click(e=>{
					$('<h5/>').appendTo($('#ques')).empty().text(($.fn.nullChecker([
					     $('#sta').val(),
						 $('#end').val(), 
						 $('#d').val()
					])))?
					'빈칸을 채우세요': '완성';
					$('#t_r').html(ques);
						if(rs=='완성'){
						let sta = $('#sta').val()*1;
						let end = $('#end').val()*1; 
						let d = $('#d').val()*1;
						let i = sta;
						let sum = 0;
						console.log(sta+','+end+','+d);
						while(i<=end){
							sum += i;
							i = d + i;
						}
					}
						
						$('#rs').append('답 : '+sum);
					
				});
		});
		
				
			
		/*	$('#t_1').html('<a id="arith_seq"><h3>등차수열</h3></a>');
			$('#t_1').append('<a id="swit_seq"><h3>스위치수열</h3></a>');
			$('#t_1').append('<a id="fibo_seq"><h3>피보나치수열</h3></a>');
			$('#t_1').append('<a id="fact_seq"><h3>팩토리얼수열</h3></a>'); 
			$('#arith_seq').click(e=>{
			
			});
			$('#swit_seq').click(e=>{
				let ques = 
					'<h3>시작값 x, 마지막값 y, 공차 d 인 스위치수열의 합을 구하시오.</h3>'
					+'	<label for="시작값">시작값</label><input id="sta" type="text" value = ""></br>'
					+'	<label for="마지막값">마지막값</label><input id="end" type="text" value =""></br>'
					+'	<label for="공차">공차</label><input id="d" type="text" value=""></br>'
					+'	<button id="bt">결과보기</button>';
				$('#t_r').html(ques);
				
				$('#bt').click(()=>{
					let sta = $('#sta').val()*1;
					let end = $('#end').val()*1;
					let d = $('#d').val()*1;
					let i = sta;
					let sum = 0;
					let sw = 0; 
					while(i<=end){
						i = d + i;
						if(sw==0){
							sum+=i;
							sw = 1;
							console.log(i+","+sum);
						}else{
							sum-=i;
							sw = 0;
							console.log("---"+i+","+sum);
						}
					}
					$('#t_r').append('답 : '+sum);	
				});
				
			});
			$('#fibo_seq').click(e=>{
				let ques = 
					'<h3>시작값 x, 마지막값 y, 공차 d 인 스위치수열의 합을 구하시오.</h3>'
					+'	<label for="시작값">시작값</label><input id="sta" type="text" value = ""></br>'
					+'	<label for="마지막값">마지막값</label><input id="end" type="text" value =""></br>'
					+'	<label for="공차">공차</label><input id="d" type="text" value=""></br>'
					+'	<button id="bt">결과보기</button>';
				$('#t_r').html(ques);
				
				
			});
			$('#fact_seq').click(e=>{
				alert('팩토리수열 선택');
			});*/
		
		
		}
};
algo.series = {
		arith : x =>{},
		fibonacci : x =>{}, //피보나치
		swit : x => {}, //스위치
		factorial : x => {} //팩토리
};
algo.array = {
		bubble : x=> {},
		insert : x=> {},
		select : x=> {},
		ranking : x=> {}
};
algo.matrix = {
		fiveBy5 : x=> {},
		sandGlass : x=>{},
		snail : x => {},
		diamond : x=> {},
		zigzag : x=> {}
};
algo.math = {
		
};
algo.appl = {};

algo.router ={
	onCreate : x =>{
		$.getScript(x+'/resources/js/router.js',
				()=>{
					$.extend(new Session(x));
					$.getScript($.ctx()+'/resources/js/util.js')
					.done(x=>{console.log('실행');})
					.fail(x=>{console.log('실패')});
					algo.main.onCreate();
					
				}
		);
	}
};
