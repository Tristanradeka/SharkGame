class GameObject
{
    constructor()
    {
    //Object properties (or attributes)
     this.x=100;
     this.y=100;
     this.w=100;
     this.h=100;
     this.vx=0;
     this.vy=0;
     this.color = `hotpink`  
     //used to set an image source. This is set in the game.js file
     this.img;
    }

    //Draws a rectangle 
    renderRect()
    {
        ctx.save();
            ctx.fillStyle = this.color
            ctx.translate(this.x, this.y)
            ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h)
        ctx.restore();
    }

    //Draws an image
    renderImg()
    {
        ctx.save();
            ctx.translate(this.x, this.y)
            ctx.drawImage(this.img,-this.w/2, -this.h/2, this.w, this.h)
        ctx.restore();
    }

    //Uses the velocitis to move an object
    move()
    {
        this.x = this.x + this.vx
        this.y = this.y + this.vy
    }

    //Returns the sides of the objects bounding box
    top()
    {
        return this.y - this.h/2;
    }
    bottom()
    {
        return this.y + this.h/2
    }
    left()
    {
        return this.x - this.w/2
    }
    right()
    {
        return this.x + this.w/2
    }

    //Used to check for collision between 2 objects
    collide(_obj)
    {
        if(
            this.top() < _obj.bottom() &&
            this.bottom() > _obj.top() &&
            this.left() < _obj.right() &&
            this.right() > _obj.left()
        )
        {
            
            return true
        }
        return false;
    }
}