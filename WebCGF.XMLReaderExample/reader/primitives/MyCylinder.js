/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, slices, stacks) {
	CGFobject.call(this,scene);

	this.slices=slices;
	this.stacks=stacks;

	this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function() {

	this.indices = [];
	this.vertices = [];
	this.normals = []; 
	this.texCoords = [];

	var stepS = 0;
	var stepT = 0;
	var angle = 2 * Math.PI / (this.slices);

	this.vertices.push(0, 0, 0.5);
	this.normals.push(0, 0, 1);
	this.texCoords.push(0.5, 0.5);	
	this.vertices.push(0, 0, -0.5);
	this.normals.push(0, 0, -1);
	this.texCoords.push(0.5, 0.5);

	var i = 0;

	for (var slice = 0; slice < this.slices; slice++)
	{
		this.vertices.push(0.5 * Math.cos(slice * angle), 0.5 * Math.sin(slice * angle), 0.5);
		this.vertices.push(0.5 * Math.cos(slice * angle), 0.5 * Math.sin(slice * angle), -0.5);

		this.normals.push(0, 0, 1);
		this.normals.push(0, 0, -1);
		
		this.texCoords.push(Math.cos(i * angle) * 0.5 + 0.5, Math.sin(i * angle) * 0.5 + 0.5);
		this.texCoords.push(Math.cos(i * angle) * 0.5 + 0.5, Math.sin(i * angle) * 0.5 + 0.5);

		i++;

	}

	for (var slice = 0; slice < this.slices; slice++)
	{
		if (slice + 1 == this.slices)
		{
			this.indices.push(0, slice*2 + 2, 2);
			this.indices.push(slice*2 + 3, 1, 3);
		}	
		else 
		{
			this.indices.push(0, 2 + slice*2, 4 + slice*2);
			this.indices.push(3 + slice*2, 1, 5 + slice*2);
		}
	}
	
	var numVertex = this.slices*2 + 2;

	for (var stack = 0; stack < this.stacks + 1; stack++)
	{
		for (var slice = 0; slice < this.slices; slice++)
		{
			this.vertices.push(0.5*Math.cos(slice * angle), 0.5*Math.sin(slice * angle), -0.5 + stack / this.stacks);
			this.normals.push(Math.cos(slice * angle), Math.sin(slice * angle),0);
			this.texCoords.push(stepS, stepT);

			stepS+=1/this.slices;
		}
		stepS = 0;
		stepT+= 1/this.stacks;
	}


	for (var stack = 0; stack < this.stacks; stack++)
	{
		for (var slice = 0; slice < this.slices; slice++)
		{
			
			if (slice == this.slices - 1)
			{
				this.indices.push(stack * this.slices + slice + numVertex,  stack * this.slices + slice + 1 - this.slices + numVertex, (stack + 1) * this.slices + slice + 1 - this.slices + numVertex);
				this.indices.push(stack * this.slices + slice + numVertex, stack * this.slices + slice + 1 + numVertex, (stack + 1) * this.slices + slice + numVertex);
			}
			else
			{
				this.indices.push(stack * this.slices + slice + numVertex, stack * this.slices + slice + 1 + numVertex, (stack + 1) * this.slices + slice + 1 + numVertex);
				this.indices.push(stack * this.slices + slice + numVertex, (stack + 1) * this.slices + slice + 1 + numVertex, (stack + 1) * this.slices + slice + numVertex);
			}
		}
	}

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};