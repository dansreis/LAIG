function HowTo(scene) {
	this.scene = scene;
	this.instruction = new MyBlock(this.scene, 6, 4, 1, 'lightBlue');
};


HowTo.prototype = Object.create(Object.prototype);
HowTo.prototype.constructor = HowTo;


HowTo.prototype.display = function(){
	if(this.instruction.texture == null)
	{
		this.instruction.texture = 'rules';
	}

	this.scene.pushMatrix();
	this.scene.applyViewMatrix();

	//how to
		this.scene.pushMatrix();
		this.scene.translate(-5,90,-5);
		this.scene.rotate(Math.PI/9, 1, 0, 0);
		this.scene.rotate(Math.PI/8, 0, 1, 0);
		this.instruction.display();
		this.scene.popMatrix();

	this.scene.popMatrix();
};

