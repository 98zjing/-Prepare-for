if(Df){
}else{
	var Df = {}
}
Df.Modal = function(){
	
	//BEGIN constructor
	var pars = this.pars = {
		contentString:false,
		contentNode:false,
		holder: document.body,
		backgroundClassName: 'holder',
		dialogClassName: 'dialogHolder',
		minWidth: 800,
		minHeight: 600,
		closeClass: 'close',
		keyPress:'RETURN',
		animateHolder: false,
		animateDialog: false
	}
	
	var h, hAnimation, hMax, d, dAnimation;
	var marginTop = 0;
	
	//END constructor
	
	//BEGIN public methods
	
	this.version = function(){
		return 1.2;
	}
	
	this.requires = function(){
		return [
			'../js/Df.js',
			'../js/prototype_1.7.0.js',
			'../js/prototype_extend.js',
			'../js/Df.Animate.js'	
			];
	}
	
	this.set = function(para){
		if(para){
			pars = Object.extend(pars,para)
		}
		
		if(pars.minWidth.constructor == Number){
			pars.minWidth += 'px'
		}else{
			pars.minWidth = parseInt($(pars.minWidth).scrollWidth)+'px'
		}
		if(pars.minHeight.constructor == Number){
			pars.minHeight += 'px'
		}else{
			pars.minHeight = parseInt($(pars.minHeight).scrollHeight)+'px'
		}
		
		//build background div
		h = $E('div',$(pars.holder),{className:pars.backgroundClassName})
		
		if(pars.animateHolder){
			hAnimation = new Df.Animate(h);
			hAnimation.pars = Object.extend(hAnimation.pars,pars.animateHolder);
		}
	}
	
	this.show = function(){
		
      h.style.display = 'block'
		
		if(hAnimation){
			if(hAnimation.getHistoryCount() == 0){
				hAnimation.run();	
			}else{
				hAnimation.last();
			}
		}
		
		if((Df.browser()).ie6){
			h.innerHTML = "<iframe style='filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);' scrolling='no' src='javascript:false;' frameborder='0' height='" +  pars.minHeight + "px' width='" + pars.minWidth + "px'></iframe>"
		}else{
			h.style.minWidth = pars.minWidth
			h.style.minHeight = pars.minHeight
		}
		
		if(pars.keyPress){
			Event.observe(document,'keypress',_return,false)
		}
	
		if(d){
			d.style.display = 'block'
			
			if(Position.realOffset(d)[1] > 0){
				var child = d.immediateDescendants()[0];
				if(child){
					child.style.display = 'block';
					child.style.marginTop = marginTop + parseInt(Position.realOffset(d)[1]) +'px'
				}
			}
			
			if(!(Df.browser()).ie6){
				d.style.minWidth = pars.minWidth
				d.style.minHeight = pars.minHeight
			}
			
			if(dAnimation){
				if(dAnimation.getHistoryCount() == 0){
					dAnimation.run();	
				}else{
					dAnimation.last();
				}
			}
		}
			
	}
	
	var hide = this.hide = function(){
		
		Event.stopObserving(document,'keypress',_return,false)
		
      if(hAnimation){
			if(hAnimation.getHistoryCount() > 0){
				hAnimation.first({onComplete: function(){
						h.style.display = "none";
					}
				});
			}
		}else{
			h.style.display = "none";
		}
		
		if(dAnimation){
			if(dAnimation.getHistoryCount() > 0){
				dAnimation.first({onComplete: function(){
						finalClose();
					}
				});
			}
		}else{
			finalClose();
		}
	}
	
	this.setContentString = function(string){
		pars.contentString = string
		if(!d){
			createDialog()
		}
		d.innerHTML = pars.contentString
		
		activateCloses();
		
		setMarginTop();
	}
	
	this.setContentNode = function(node){
		pars.contentNode = node
		
		if(!d){
			createDialog();
		}
		d.innerHTML = '';
		d.appendChild(pars.contentNode);
		
		activateCloses();
		
		setMarginTop();
	}
	
	//END public methods
	
	//BEGIN private Methods
	
	var finalClose = function(){
		var child = d.immediateDescendants()[0];
		if(child){
			child.style.marginTop = marginTop + 'px';
			child.style.display = 'none';
		}
		d.style.display = "none";
	}
	
	var setMarginTop = function(){
		var child = d.immediateDescendants()[0];
		if(child){
			marginTop = parseInt(child.getStyle('marginTop'))
		}
	}
	
	var activateCloses = function(){
		var closes = document.getElementsByClassName(pars.closeClass, d);
		for(var i=0; i<closes.length; i++){
			closes[i].onclick = hide
		}	
	}
	
	var createDialog = function(){
		d = $E('div',$(pars.holder),{className:pars.dialogClassName});
		
		if(pars.animateDialog){
			dAnimation = new Df.Animate(d);
			dAnimation.pars = Object.extend(dAnimation.pars,pars.animateDialog);
		}
	}
	
	var _return = function(event){
		if(Event.keyCode(event) == Event.KEY_RETURN){
			hide()
		}
	}
	//END private Methods
}