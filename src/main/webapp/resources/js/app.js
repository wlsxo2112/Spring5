"use strict"//에러를 바로 내겠다. //엄격한 문법을 적용하시오. 틀리면 에러처리하라는 명령어
var app= app || { };
var user = user || {};

//만약에 app 있다면 있는걸로 대체하고 없으면 새로운거로 만들어라.	
app =(()=>{
	var init =x=>{
		console.log('step 1'); //콘솔에 뜨게하는 것
		app.router.init(x); 
	};
	return {
		init : init
	};
})();
app.main =(()=>{
	var w,header,footer,content,nav,ctx,script,style,img;
	var init =()=>{
		ctx = $.ctx();
		script = $.script();
		style = $.style();
		img = $.img();
		w= $('#wrapper');
		header = script+'/header.js';
		content = script+'/content.js';
		nav = script+'/nav.js';
		footer = script+'/footer.js';
		onCreate();
	};
	var onCreate =()=>{    //우리가배운 에이작스 코딩은 여기다 코딩한다.
		setContentView(); 
		
	};
	var setContentView =()=>{    //이벤트를 주지않아도 보여지는 화면.
		app.router.home();
	};
	return {
		init : init
	};
})();
app.board = (()=>{
	var w,header,footer,content,nav,ctx,script,style,img;
	var init =()=>{
		ctx = $.ctx();
		script = $.script();
		style = $.style();
		img = $.img();
		w= $('#wrapper');
		header = script+'/header.js';
		content = script+'/content.js';
		nav = script+'/nav.js';
		footer = script+'/footer.js';
		onCreate();
	};
	var onCreate =()=>{
		setContentView(); 
	};
	var setContentView =()=>{
		$('#content').empty();
		app.service.boards(1);

	};
	
	return {init : init};
})();
app.permission =(()=>{
	var login =()=>{
		alert('login');
		$('#content').empty();
		$.getScript($.script()+'/compo.js',()=>{
			$.getScript($.script()+'/login.js',()=>{
				$('#content').html(loginUI());
				ui.anchor({id:'login_submit',txt : '로그인'})
				.css({'width':'300px'})
				.addClass("btn btn-primary")
				.appendTo($("#loginForm"))
				.click(e=>{
					$.ajax({
						url: $.ctx()+'/member/login',
						method : 'post',
						contentType : 'application/json',
						data : JSON.stringify({
							userid: $('#userid').val(),
							password: $('#password').val()}
						),
						success : d=>{
							alert('ID 판단'+d.ID);   //d가 rmap 이다.
							alert('PW 판단'+d.PW);
							alert('MBR 판단'+d.MBR.userid);   
							if(d.ID ==="WRONG"){ 
								  
							}else if(d.PW==="WRONG"){
								
							}else{
								$.getScript($.script()+'/content.js',()=>{
							
									$('#content').html(contentUI());
									$('#loginDivBtn').empty();
									$('<li/>').attr('id','login_btn').addClass("nav-item mx-0 mx-lg-1").appendTo($('#loginDivBtn'));
									$('<a/>').attr('href','#').addClass("nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger")
									.html('logout').appendTo($('#loginDivBtn'))
									.click(e=>{
										alert('로그아웃!');
										app.router.home();
									});
									
									$('#joinDivBtn').empty();
									$('<li/>').attr('id','join_btn').addClass("nav-item mx-0 mx-lg-1").appendTo($('#joinDivBtn'));
									$('<a/>').attr('href','#').addClass("nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger").html('mypage').appendTo($('#joinDivBtn'))
									.click(e=>{});
									
									$('#BoardDivBtn').empty();
									$('<li/>').attr('id','myboard').addClass("nav-item mx-0 mx-lg-1").appendTo($('#BoardDivBtn'));
									$('<a/>').attr('href','#').addClass("nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger").html('나의게시판').appendTo($('#BoardDivBtn'))
									.click(e=>{
										alert('게시판');
										e.preventDefault();
										app.service.my_board({
											id : d.MBR.userid, pageNo : '1'
										});
									});
								})
							
								
								
							}
						},
						error : (m1,m2,m3)=>{
							alert('에러발생1'+m1);
							alert('에러발생2'+m2);
							alert('에러발생3'+m3);
						}
					});
				})
				
				
			});
		});
		

	};
	var join =()=>{
		alert('join');
		$('#content').empty();
		$.getScript($.script()+'/compo.js',()=>{
			$.getScript($.script()+'/add.js',()=>{
				$('#content').html(addUI());
				/*$("[name='subject']")
				.change(function(){
					alert($(this).val());
				});*/
				ui.anchor({id:'join_submit',txt : '회원가입'})
				.css({'width':'300px'})
				.addClass("btn btn-primary")
				.appendTo($("#joinForm"))
				.click(e=>{
				/*	var arr = [];*/
					var sub = $("[name='subject']");
					let i;
					let a = '';
					for(i of sub){
						if(i.checked){
							alert('선택된과목::'+i.value);
							/*arr.push(i.value);*/
							a += i.value+',';
						}
					}
					$.ajax({
						url : $.ctx()+'/member/add',
						method : 'post',
						contentType : 'application/json',
						data : JSON.stringify({
							name : $('#name').val(),
							userid : $('#userid').val(),
							password : $('#password').val(),
							ssn : $('#ssn').val(),
							teamid : $('input[name="teamid"]:checked').val(),//??
							roll : $('#roll').val(),
							subject : a
						}),
							
						success :d=>{
							
						},
						error : (m1,m2,m3)=>{
							alert('에러발생1'+m1);
							alert('에러발생2'+m2);
							alert('에러발생3'+m3);
						}
					
					});
					
				});
			});
		});

	};
	return {
		login : login,
		join : join
		
	};
})();
app.service = { //공유할 필요가 없기 때문에 객체리터럴.
		boards : x=>{
			$.getJSON($.ctx()+'/boards/'+x,d=>{ //d는 자바에서 넘어온 것 map.
				$.getScript($.script()+'/compo.js',()=>{
					$('#content').empty();
					let t = {
		                    type : 'default',
		                    id : 'table',
		                    head : '게시판',
		                    body : '오픈 게시판 누구든지 사용 가능',
		                    list : ['No','제목','내용','글쓴이','작성일','조회수'],
		                    clazz : 'table table-bordered'
					
		                };
		                (ui.tbl(t))
		                .appendTo($('#content'));
		                $.each(d.list,(i,j)=>{//d객체(자바에서건너온 lst의 index : j//  i아니다..)
		                    let tr = $('<tr/>');
		                    $('<th/>').html(j.bno).appendTo(tr);
		                    $('<td/>').html(j.title).appendTo(tr);
		                    $('<td/>').html(j.content).appendTo(tr);
		                    $('<td/>').html(j.writer).appendTo(tr);
		                    $('<td/>').html(j.regdate).appendTo(tr);
		                    $('<td/>').html(j.viewcnt).appendTo(tr);
		                    tr.appendTo($('#tbody'))
		                });
		              console.log(d.page.rowCount);
		              ui.page({}).appendTo($('#content'));
			            let ul = $('.pagination');
			            let existPrev = d.page.existPrev;
			      		let existNext = d.page.existNext;
			      		let prev ='',next ='';
			      		if(!existPrev){
			      			prev = 'disabled';
			      		}
			      		if(!existNext){
			      			next = 'disabled';
			      		}
			      		let preli = $('<li id ="prev" class="page-item '+prev+'"><span class="page-link" >◀</span>');
			      		let nextli = $('<li id = "next" class="page-item '+next+'"><span class="page-link" >▶</span>');
			      		preli.appendTo(ul)
			      		.click(e=>{
			      			alert('이전버튼!');
			      			e.preventDefault();
							if(d.page.existPrev){
								app.service.boards(d.page.prevBlock);
							}
			      		})
			      		;
			      		
			      		for(let i=d.page.beginPage; i<=d.page.endPage; i++){
			      			$('<li class="page-item"/>')
			      		 	.addClass((i==d.page.pageNumber)?'active':'')
			      		 	.append(
			      		 			$('<span/>').addClass('page-link')
					      		 	.html(i)).appendTo(ul)
					      		 	.click(e=>{
					      		 		alert('나는'+i+'눌렀다');
					      		 		
					      		 		app.service.boards(i);
			      		 	});
			      	
			      		}
			      		nextli.appendTo(ul)
			      		.click(e=>{
			      			alert('다음버튼');
			      			e.preventDefault();
							if(d.page.existNext){
								app.service.boards(d.page.nextBlock);
							}
			      		});
			      	
				});
			});	
		},
		
		my_board : x=>{
			$.getJSON($.ctx()+'/boards/'+x.id+'/'+x.pageNo, d=>{
				$.getScript($.script()+'/compo.js',()=>{
					$('#content').empty();
					let t = {
		                   type : 'default',
		                    id : 'table',
		                    head : '게시판',
		                    body : x.id+'님의 게시판',
		                    list : ['No','제목','내용','글쓴이','작성일','조회수'],
		                    clazz : 'table table-bordered'
		                };
		                (ui.tbl(t))
		                .appendTo($('#content'));
		                $.each(d.list,(i,j)=>{//d객체(자바에서건너온 lst의 index : j//  i아니다..)
		                    let tr = $('<tr/>');
		                    $('<th/>').html(j.bno).appendTo(tr);
		                    $('<td/>').html(j.title).appendTo(tr);
		                    $('<td/>').html(j.content).appendTo(tr);
		                    $('<td/>').html(j.writer).appendTo(tr);
		                    $('<td/>').html(j.regdate).appendTo(tr);
		                    $('<td/>').html(j.viewcnt).appendTo(tr);
		                    tr.appendTo($('#tbody'))
		                });
		            	
		              console.log(d.page.rowCount);
		              ui.page({}).appendTo($('#content'));
			            let ul = $('.pagination');
			            let existPrev = d.page.existPrev;
			      		let existNext = d.page.existNext;
			      		let prev ='',next ='';
			      		if(!existPrev){
			      			prev = 'disabled';
			      		}
			      		if(!existNext){
			      			next = 'disabled';
			      		}
			      		let preli = $('<li id ="prev" class="page-item '+prev+'"><span class="page-link" >◀</span>');
			      		let nextli = $('<li id = "next" class="page-item '+next+'"><span class="page-link" >▶</span>');
			      	
			      		preli.appendTo(ul)
			      		.click(e=>{
			      			alert('이전버튼!');
			      		})
			      		;
			      		
			      		
			      		for(let i=d.page.beginPage; i<=d.page.endPage; i++){
			      			$('<li class="page-item"/>')
			      		 	.addClass((i==d.page.pageNumber)?'active':'')
			      		 	.append(
			      		 			$('<span/>').addClass('page-link')
					      		 	.html(i)).appendTo(ul)
					      		 	.click(e=>{
					      		 		alert('나는'+i+'눌렀다');
					      		 		app.service.my_board({id:d.id,pageNo:i});
			      		 	});
			      	
			      		}
			      		nextli.appendTo(ul)
			      		.click(e=>{
			      			alert('다음버튼');
			      		});
			      		ui.anchor({id:'board_write',txt : '글쓰기'})
						.css({'width':'300px'})
						.addClass("btn btn-success")
						.appendTo($("#content"))
						.click(e=>{
							alert('게시글쓰기');
							app.service.board_write(x);
						});
			  
				});
			});	
		
			
		},
		board_write :x=>{
				$('#content').empty();
				$('<div/>').attr('id','div_con').addClass('container').appendTo($('#content'));
				$('<h5/>').html('게시글작성').appendTo($('#div_con'));
				
				$('<div/>').attr({id:'write_div'}).addClass('form-group').appendTo($('#div_con'));
				$('<label/>').attr({'for':'userid'}).html('글쓴이').appendTo($('#write_div'));
				$('<input/>').attr({'value':x.id}).addClass('form-control').appendTo($('#write_div'));
				
				$('<div/>').attr({id:'write_div2'}).addClass('form-group').appendTo($('#div_con'));
				$('<label/>').attr({'for':'title'}).html('제목').appendTo($('#write_div2'));
				$('<input/>').attr({'type':'text',id:'title'}).addClass('form-control').appendTo($('#write_div2'));
				
				$('<div/>').attr({id:'write_div3'}).addClass('form-group').appendTo($('#div_con'));
				$('<label/>').attr({'for':'content'}).html('내용').appendTo($('#write_div3'));
				$('<textarea>').attr({id:'brd_content','rows':'5'}).addClass('form-control').appendTo($('#write_div3'));
				ui.anchor({id:'write_success',txt : '등록'})
				.css({'width':'300px'})
				.addClass("btn btn-success")
				.appendTo($("#div_con"))
				.click(e=>{
					alert('등록');
					$.ajax({
						url : $.ctx()+'/boards/create',
						method : 'post',
						contentType : 'application/json',
						data : JSON.stringify({
							writer :x.id, //자바스크립트에 있는 아이디
							title: $('#title').val(),
							content : $('#brd_content').val()
							
					}),
					success :d=>{
						alert("아이디::"+x.id);
						app.service.my_board({id:x.id,pageNo:'1'});
					},
					error : (m1,m2,m3) =>{}
					
				});
			});
				ui.anchor({id:'write_cancel',txt:'취소'})
				.css({'width':'300px'})
				.addClass("btn btn-success")
				.appendTo($("#div_con"))
				.click(e=>{
					alert('취소');
					app.service.my_board({id:x.id,pageNo:'1'});
				})
		
		}
};
app.router ={
		init : x =>{
			$.getScript(x+'/resources/js/router.js',
					()=>{
						$.extend(new Session(x));
						$.getScript($.script()+'/util.js')
						.done(x=>{console.log('실행');})
						.fail(x=>{console.log('실패')});
						app.main.init();
						
				}
		);
	},
	home : ()=>{
		   $.when(
		            $.getScript($.script()+'/header.js'),
		            $.getScript($.script()+'/content.js'),
		            $.getScript($.script()+'/nav.js'),
		            $.getScript($.script()+'/footer.js'),
		            $.Deferred(y=>{
		            	 $(y.resolve);
		            })
		        ).done(z=>{
		        	$('#wrapper').html(
		        			 headerUI()
		        			 +navUI()
		        			 +contentUI()
		        			 +footerUI() 
		        	 		);
		        	$('#login_btn').click(e=>{
		        		e.preventDefault(); //디폴트값을 막아준다. href="#"이 있어도 상관없다. e 안에서만이다.
		        		app.permission.login();
		        	});
		        	$('#board').click(e=>{
		        		e.preventDefault();
		        		app.board.init();
		        	});
		        	$('#join_btn').click(e=>{
		        		e.preventDefault();
		        		app.permission.join();
		        	})
		        })
		        .fail(x=>{
		        	console.log('로드 실패');
		        });
	}
};
	




