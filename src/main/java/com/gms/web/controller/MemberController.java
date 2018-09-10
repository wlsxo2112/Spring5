package com.gms.web.controller;

import javax.servlet.http.HttpSession;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.gms.web.domain.MemberDTO;
import com.gms.web.service.MemberService;

//
@Controller
@RequestMapping("/member")
@SessionAttributes("user")
public class MemberController {
	static final Logger logger =  LoggerFactory.getLogger(MemberController.class);
	 //set만 하는거임. 선언이 아니고 객체로 만드는 거임. 싱글톤의 getInstance와 같다.
	@Autowired MemberService memberService;
	@RequestMapping(value= "/add", method=RequestMethod.POST)
	public String add(@ModelAttribute("member") MemberDTO member) {
		logger.info("---MemberContoller add {}--");
		memberService.add(member);
		
		System.out.println("name is "+member.getName());
		return "redirect:/";
	}
	
	/*@RequestMapping("/list")
	public void list() {}
	@RequestMapping("search")
	public void search() {}
	@RequestMapping("/retrieve")
	public void retrieve() {}
	@RequestMapping("/count")
	public void count() {}*/
	
	@RequestMapping(value="/modify", method = RequestMethod.POST)
	public String modify(@ModelAttribute("member") MemberDTO member,
						 @ModelAttribute("user") MemberDTO user) {
		logger.info("---MemberContoller modify {}--");
		System.out.println("Modfiy 비밀번호 : "+member.getPassword());
		member.setUserid(user.getUserid());
		memberService.modify(member); // 값이 바뀌는 지점
		
		 
		return "/move/public/member/retrieve";
		
	}
	@RequestMapping(value="/remove", method = RequestMethod.POST)
	public String remove(@ModelAttribute("member") MemberDTO member,
						 @ModelAttribute("user") MemberDTO user) {
		logger.info("---MemberContoller remove {}--");
		member.setUserid(user.getUserid());
		System.out.println("아이디떠랑><"+member.getUserid()+"///"+member.getPassword());
		memberService.remove(member);
		return "redirect:/";
		
	}
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public String login(@ModelAttribute("member") MemberDTO member, Model model) {
		logger.info("---MemberContoller login {}--");
		String page ="";
		System.out.println("--------------- login -------------");
		System.out.println("memservice : "+memberService.login(member));
		if(memberService.login(member)){
			logger.info("--로그인 성공---");
			model.addAttribute("user",memberService.retrieve(member));
			page = "login_success";
			
		}else {
			logger.info("--로그인 실패---");
			page = "redirect:/move/public/member/login";
		}
		
		return page;
	
		
		
	}
	@RequestMapping("/logout")
	public String logout() {
		logger.info("---MemberContoller logout {}--");
		return "redirect:/";
	}
	@RequestMapping("/fileupload")
	public void fileupload() {}
	
}