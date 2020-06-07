
var gl;
var canvas;
var shaderProgram;
var pers_view = true;
var pickedObject = null;

function setup(){
    /*============== Creating a canvas ====================*/
    canvas = document.getElementById('my_Canvas');
    gl = canvas.getContext('experimental-webgl');

    gl.clearColor(0.0, 0.0, 0.0, 0.9);
    gl.clear(gl.cube_colors_buffer_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST); //draw a pixel only if its closer to the virtual camera

    /*============== Initialise shaders ====================*/
    shaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(shaderProgram);

}



/*============== Translation Declaration ====================*/
var all_translations = {
   
    translate1 : [8,0,0],
    translate2 : [-1,0,0],
    translate3 : [-7.5,0,0],
    translate4 : [-18,1,0],
    translateStage : [0.5,-5,40],
    translateTest : [0,0,0],
    translateFrame1 : [3,0,0],
    translatePicture1: [22,0,32],
    translatePicture2: [22,0,48],
    translatePicture3: [-22,0,32],
    translatePicture4: [-22,0,48],
    translateRoom : [0,0,40],
    translateMonkey : [-13,1,29],
    translate0 : [-13,-3,29],
    translatepoduim2 : [13,-3, 29],
    translatepoduim3 : [13,-3, 42],
    translatepoduim4 : [-13,-3, 42],
    translatemainLight : [0,4.8,40],
    translateFanRod: [0,4,47],    //  [0,4.1,4]
    translateFanBlade1: [0,2,47],    //  [1,3,5],
    translateFanBlade2: [0,2,47],   // [-1,3,5],
    translateDog : [-13,-3,42],
    translateCup : [13,0, 42],
    translateKettle: [13,0,29]
}

/*============== Rotation Declaration ====================*/
var axis_rotations = {
    cube_axis : [0,0,1],
    frame_axis : [1,1,1],
    room_axis : [-1,0,0],
    stage_axis : [1,0,0],
    picture_axis: [1,0,0],
    monkey_axis : [1,0,0],
    mainLight : [1,0,0],
    FanRod_axis : [0,1,0],
    blade1 : [0,1,0],
    blade2 : [0,1,0],
    dog_axis : [-1,0,0],
    cup_axis: [-1,0,0],
    kettle_axis : [-1,0,0]
}


/*============== Material Declaration ====================*/
var cubeMaterial = {
    materialAmbient : [0.5,0.5,0.5],
    materialDiffuse : [0.6,0.4,0.7],
    materialSpecular : [0.5,0.5,0.5],
    materialShininess : 0.21794872
}

//Brass
var roomMaterial = {
    // materialAmbient : [0.329412,0.223529,0.027451],
    // materialDiffuse : [0.780392,0.568627,0.113725],
    // materialSpecular : [0.992157,0.941176,0.807843],
    // materialShininess : 100


        materialAmbient : [0.1, 0.1, 0.1],
        materialDiffuse : [0.55, 0.55, 0.55],
        materialSpecular : [0, 0, 0],
        materialShininess : 100
}

//Ruby
var ruby = {
    materialAmbient : [0.1,0.18725,0.1745],
    materialDiffuse : [0.396,0.74151,0.69102],
    materialSpecular : [0.,0.,0.],
    materialShininess : 16.0
}


//Chrome
var triangle_prism_Material = {
    materialAmbient : [ 0.25,0.25, 0.25],
    materialDiffuse : [0.4,0.4,0.4],
    materialSpecular : [0.774597,0.774597,0.774597],
    materialShininess : 16.0
}

var pearl = {
    materialAmbient : [0.05, 0.05,0.0],
    materialDiffuse : [0.5,0.5,0.4],
    materialSpecular : [0.7, 0.7, 0.04],
    materialShininess : 7.8
}

var stageMaterial = {
        materialAmbient : [0.0, 0.0, 0.0],
        materialDiffuse : [0.55, 0.55, 0.55],
        materialSpecular : [0.7, 0.7, 0.7],
        materialShininess : 100
}

var mainLightMaterial = {
    materialAmbient : [1.0, 1.0, 1.0],
    materialDiffuse : [1.0, 1.0, 1.0],
    materialSpecular : [0.7, 0.7, 0.7],
    materialShininess : 100
}

var gold = {
    materialAmbient : [ 0.24725, 0.1995, 0.0745],
    materialDiffuse : [0.75164, 0.60648, 0.22648],
    materialSpecular : [0.628281, 0.555802, 0.366065],
    materialShininess : 12
}

var turquise = {
    materialAmbient : [0.1, 0.18725, 0.1745],
    materialDiffuse : [0.396, 0.74151, 0.69102],
    materialSpecular : [0.297254, 0.30829, 0.306678],
    materialShininess : 51
}



/*============== Scaling Declaration ====================*/
var stage_scale = [20,1,1];

//The color code for the model--picking by color
var podiumColorCode1 =   [0.1,0.0,0.0];
var podiumColorCode2 =   [0.2,0.0,0.0];
var podiumColorCode3 =   [0.4,0.0,0.0];
var fanRodColorCode =    [0.6,0.0,0.0];
var fanBlade1ColorCode = [0.8,0.2,0.0];
var fanBlade2ColorCode = [1.0,0.0,0.0];
var monkeyColorCode =    [0.0,0.2,0.0];
var mainLightColorCode = [0.0,0.4,0.0];
var picture1ColorCode =  [0.0,0.6,0.0];
var picture2ColorCode =  [0.0,0.8,0.0];
var picture3ColorCode =  [0.0,1.0,0.0];
var picture4ColorCode = [0.0,0.0,1.0];
var roomColorCode =      [0.0,0.0,0.2];
var dogColorCode =       [0.0,0.0,0.4];
var kettleColorCode =    [0.0,0.0,0.6];
var cupColorCode    =    [0.0,0.0,0.8];

var allTheCode = [podiumColorCode1, podiumColorCode2, podiumColorCode3, fanRodColorCode,
                fanBlade1ColorCode, fanBlade2ColorCode, monkeyColorCode, mainLightColorCode,
                 picture1ColorCode, picture2ColorCode, picture3ColorCode, picture4ColorCode, roomColorCode,
                 dogColorCode, kettleColorCode, cupColorCode]


var museumObjects = ["podium1", "podium2", "podium3", "fanRod", "fanBlade1", "fanBlade2",
"monkey", "main Light", "picture1", "picture2", "picture3",
"picture4", "room", "dog", "kettle", "cup"]



/*============== Buffer Declaration ====================*/
var stage_buffer;
var stage_index;
var stageIndex;
var stageNormalBuffer;
var stageTextureBuffer;

var cube_buffer;
var cube_index_buffer;
var normalsBuffer;
var cubeTextureBuffer;



var picture1_buffer;
var picture1_index_buffer;
var picture1NormalBuffer;
var picture1TextureBuffer;


var picture2_buffer;
var picture2_index_buffer;
var picture2NormalBuffer;
var picture2TextureBuffer;


var room_buffer;
var room_index_buffer;
var roomIndex;
var roomNormalBuffer;
var roomTextureBuffer;



var frame1_buffer;
var frame1_index_buffer;
var frame1NormalBuffer;
var frame1TextureBuffer;

var monkey_buffer;
var monkey_index;
var monkey_normal_buffer;
var monkey_Texturebuffer;

var main_light_buffer;
var main_light_index;
var main_normal_bufer;
var mainLightTextureBuffer;


var fan_Rod_buffer;
var fan_Rod_index_buffer;
var fan_Rod_Normal_buffer;

var fan_blade_buffer1;
var fan_blade_index1;
var fan_blade_Normal1;

var fan_blade_buffer2;
var fan_blade_index2;
var fan_blade_Normal2;

var dog_buffer;
var dog_index_buffer;
var dogIndex;
var dog_normal_buffer;

var cup_buffer;
var cup_index_buffer;
var cupIndex;
var cup_normal_buffer;

var kettle_buffer;
var kettle_index_buffer;
var kettleIndex;
var kettle_normal_buffer;



function initBuffers(){

    /*============== Stage Buffer ====================*/
    stage_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, stage_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(stage), gl.STATIC_DRAW);
    //console.log(stage);

    stage_index = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, stage_index);
    stageIndex = [].concat.apply([], stage_indics);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(stageIndex), gl.STATIC_DRAW);
    

    stageNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, stageNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(stageNormal),  gl.STATIC_DRAW);


    stageTextureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, stageTextureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(stageTextcoord), gl.STATIC_DRAW);


    /*============== Cube Buffer ====================*/
    // Create an empty buffer object to store vertex buffer
    cube_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cube_buffer); // Bind appropriate array buffer to it
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVert), gl.STATIC_DRAW); // Pass the vertex data to the buffer

    // Create an empty buffer object to store Index buffer
    cube_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    

    normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeNormal),  gl.STATIC_DRAW);

    cubeTextureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeTextureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeTextureCoord), gl.STATIC_DRAW);


    /*============== Picture1 Buffer ====================*/
    picture1_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, picture1_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pictureVert), gl.STATIC_DRAW);

    picture1_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, picture1_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pictureIndices), gl.STATIC_DRAW);

    picture1NormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, picture1NormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pictureNormals), gl.STATIC_DRAW);

    picture1TextureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, picture1TextureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pictureTextCord), gl.STATIC_DRAW);


    /*============== Picture2 Buffer ====================*/
    picture2_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, picture2_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pictureVert), gl.STATIC_DRAW);

    picture2_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, picture2_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(pictureIndices), gl.STATIC_DRAW);

    picture2NormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, picture2NormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pictureNormals), gl.STATIC_DRAW);

    picture2TextureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, picture2TextureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pictureTextCord), gl.STATIC_DRAW);



    /*============== Room Buffer ====================*/
    room_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, room_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(roomVert), gl.STATIC_DRAW);

    room_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, room_index_buffer);
    roomIndex = [].concat.apply([], roomIndices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(roomIndex), gl.STATIC_DRAW);

    roomNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, roomNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(roomNormals), gl.STATIC_DRAW);

    roomTextureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, roomTextureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(roomTextureCoord), gl.STATIC_DRAW);



    /*========== monkey ===============*/
    monkey_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, monkey_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(try4.meshes[5].vertices), gl.STATIC_DRAW);

    monkey_index = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, monkey_index);
    var monkeyindexL = [].concat.apply([], try4.meshes[5].faces);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(monkeyindexL), gl.STATIC_DRAW);

    monkey_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, monkey_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(try4.meshes[5].normals), gl.STATIC_DRAW);

    monkey_Texturebuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, monkey_Texturebuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(try4.meshes[5].texturecoords[0]), gl.STATIC_DRAW);


    /*=============light============================*/
    main_light_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, main_light_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(try4.meshes[8].vertices), gl.STATIC_DRAW);

    main_light_index = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, main_light_index);
    var mainLight = [].concat.apply([], try4.meshes[8].faces);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mainLight), gl.STATIC_DRAW);

    main_normal_bufer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, main_normal_bufer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(try4.meshes[8].normals), gl.STATIC_DRAW);


    mainLightTextureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mainLightTextureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(try4.meshes[8].texturecoords[0]), gl.STATIC_DRAW);


    /*=======Fan Blade1===================*/
    fan_blade_buffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, fan_blade_buffer1)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fan_blades1), gl.STATIC_DRAW);

    fan_blade_index1 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, fan_blade_index1);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(fan_bladesIndics1), gl.STATIC_DRAW);

    fan_blade_Normal1 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, fan_blade_Normal1);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fan_B_Normal1), gl.STATIC_DRAW);

    /*=============Fan Blade2============================*/
    fan_blade_buffer2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, fan_blade_buffer2)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fan_blades2), gl.STATIC_DRAW);

    fan_blade_index2 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, fan_blade_index2);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(fan_bladesIndics2), gl.STATIC_DRAW);

    fan_blade_Normal2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, fan_blade_Normal2);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fan_B_Normal2), gl.STATIC_DRAW);

    /*============= Fan Rod ===============*/
    fan_Rod_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, fan_Rod_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fan_middle_vertics), gl.STATIC_DRAW);

    fan_Rod_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, fan_Rod_index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(fan_middle_index), gl.STATIC_DRAW);

    fan_Rod_Normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, fan_Rod_Normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(fan_middle_normal), gl.STATIC_DRAW);


    /*============= Dog ===============*/
    dog_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dog_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(blend.meshes[2].vertices), gl.STATIC_DRAW);

    dog_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, dog_index_buffer);
    dogIndex =  [].concat.apply([], blend.meshes[2].faces);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(dogIndex), gl.STATIC_DRAW);

    dog_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dog_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(blend.meshes[2].normals), gl.STATIC_DRAW);


    /*============= Cup ===============*/
    cup_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cup_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(blend.meshes[0].vertices), gl.STATIC_DRAW);

    cup_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cup_index_buffer);
    cupIndex =  [].concat.apply([], blend.meshes[0].faces);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cupIndex), gl.STATIC_DRAW);

    cup_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cup_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(blend.meshes[0].normals), gl.STATIC_DRAW);



    /*============= Kettle ===============*/
    kettle_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, kettle_buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(blend.meshes[5].vertices), gl.STATIC_DRAW);

    kettle_index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, kettle_index_buffer);
    kettleIndex =  [].concat.apply([], blend.meshes[5].faces);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(kettleIndex), gl.STATIC_DRAW);

    kettle_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, kettle_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(blend.meshes[5].normals), gl.STATIC_DRAW);

    OffscreenBuffer();

}




/*============== Create Offscreen Buffer ====================*/
//Funtion from Webgl beginner Guide bu Diego & Brandon
var framebuffer;
function OffscreenBuffer(){
    var texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture); 
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    
    var renderbuffer = gl.createRenderbuffer(); 
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer); 
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, canvas.width, canvas.height);

    framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

    //Attaching the texture buffer and render buffers to the frame buffer
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

    //Unbidding the buffers
    gl.bindTexture(gl.TEXTURE_2D, null); 
    gl.bindRenderbuffer(gl.RENDERBUFFER, null); 
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

function render(len) {
    var uOffscreenLoc = gl.getUniformLocation(shaderProgram, "uOffscreen");

    //on-screen rendering    
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);    
    gl.uniform1f(uOffscreenLoc, 0.0);    
    gl.drawElements(gl.TRIANGLES, len, gl.UNSIGNED_SHORT,0);


    //off-screen rendering    
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);         
    gl.uniform1f(uOffscreenLoc, 1.0);    
    gl.drawElements(gl.TRIANGLES, len, gl.UNSIGNED_SHORT,0);        

    
}
//-----------------//Funtion from Webgl beginner Guide bu Diego & Brandon END



/*============== Camera and light flag Declaration ====================*/
var forward_back = 80;
var forward_flag = false;
var backward_flag = false;

var left_right = 0;
var left_flag = false;
var right_flag = false;
var mouse_left_right = 0.0;
var mouse_up_down = 0.0;

var up_down = -2;
var up_flag = false;
var down_flag = false;

var LeftLight = true;
var rightLight = true;
var topMovingLight = false;
var headSpotLight = false;
var mouseSpotLight = false;



var L_Switch = 1;
var R_Switch = 1;
var top_switch =1;
var headSpotLight_switch = 1;
var mouseSpotLight_switch = 1;


var lightAmbient = 30;
var topLightX = 0;


var leftLightPosZ = 20;
var redLeftLight = 0;
var greenLeftLight = 128;
var blueLeftLight = 128;

var rightLightPosZ = 20;
var redRightLight = 128;
var greenRightLight = 128;
var blueRightLight = 128;



var dragging = false;
var x = 0;
var y = 0;

var cameraEye;
var steps = 0;
var normal = vec3.create();
var cameraNewPos = [0,0,0];

var nAzimuth;
var nElevation;

var approach_flag = false;
var approachRight_flag = false;
var approach = 0;
var op = 0;

function CreateMat4From(x,y,z){
    var result = mat4.create();
    result[3] = x;
    result[7] = y;
    result[11] = z;
    //console.log(result);
    return result;

}

function setUniformAttribute(translate, objectMaterial, deg_angle=0, rot_axis=[0,1,0] ,scale=[1,1,1], colorCode){

    /* ==========Set Matrix======================================*/
    var Pmatrix = gl.getUniformLocation(shaderProgram, 'Pmatrix'); //Orthographic or perspective
    var Vmatrix = gl.getUniformLocation(shaderProgram, 'Vmatrix'); //Camera or View
    var Mmatrix = gl.getUniformLocation(shaderProgram, 'Mmatrix'); //transformation
    var normalMatrix = gl.getUniformLocation(shaderProgram, 'normalMatrix');

    var eyePosition =  gl.getUniformLocation(shaderProgram, 'eyePosition');
    var u_movingPointLightPosition = gl.getUniformLocation(shaderProgram, 'u_movingPointLightPosition');

    var u_headSpotLightPosition = gl.getUniformLocation(shaderProgram, 'u_headSpotLightPosition');
    var u_headSpotLightDirection = gl.getUniformLocation(shaderProgram, 'u_headSpotLightDirection');
    var u_headSpotLightLimit = gl.getUniformLocation(shaderProgram, 'u_headSpotLightLimit');

    var u_mouseSpotLightPosition = gl.getUniformLocation(shaderProgram, 'u_mouseSpotLightPosition');
    var u_mouseSpotLightDirection = gl.getUniformLocation(shaderProgram, 'u_mouseSpotLightDirection');
    var u_mouseSpotLightLimit = gl.getUniformLocation(shaderProgram, 'u_mouseSpotLightLimit');

    var pointLightPositionRight = gl.getUniformLocation(shaderProgram, 'pointLightPositionRight');
    var pointLightDiffusionRight = gl.getUniformLocation(shaderProgram, 'pointLightDiffuse2');
    var pointLightPositionLeft = gl.getUniformLocation(shaderProgram, 'pointLightPositionLeft');
    var pointLightDiffusionLeft = gl.getUniformLocation(shaderProgram, 'pointLightDiffuse');

    var mode_ambient = gl.getUniformLocation(shaderProgram, 'mode_ambient');
    var mode_left = gl.getUniformLocation(shaderProgram, 'mode_left');
    var mode_right = gl.getUniformLocation(shaderProgram, 'mode_right');
    var mode_topMovingLight = gl.getUniformLocation(shaderProgram, 'mode_topMovingLight');
    var mode_headSpotLight = gl.getUniformLocation(shaderProgram, 'mode_headSpotLight');
    var mode_mouseSpotLight = gl.getUniformLocation(shaderProgram, 'mode_mouseSpotLight');
    var mode_shadow = gl.getUniformLocation(shaderProgram, 'mode_shadow');
    var mode_shadow2 = gl.getUniformLocation(shaderProgram, 'mode_shadow2');

    
    var Ka = gl.getUniformLocation(shaderProgram, 'Ka');
    var Kd = gl.getUniformLocation(shaderProgram, 'Kd');
    var Ks = gl.getUniformLocation(shaderProgram, 'Ks');
    var u_shininess = gl.getUniformLocation(shaderProgram, 'u_shininess');


    var Objectcode = gl.getUniformLocation(shaderProgram, 'Objectcode');


    var identityMatrix = new Float32Array(16);
    var proj_matrix = new Float32Array(16);
    var view_matrix = new Float32Array(16);
    var mov_matrix = new Float32Array(16);
    

    var trans_matrix = new Float32Array(16);
    var rotate_matrix = new Float32Array(16);
    var scale_matrix = new Float32Array(16);
    var result_matrix = new Float32Array(16);

    mat4.identity(identityMatrix);
    if(pers_view){
        mat4.perspective(proj_matrix, glMatrix.toRadian(45), canvas.width/canvas.height, 0.1, 100); //Set the perspective view
    }else{
        mat4.ortho(proj_matrix, -canvas.width/85, canvas.width/85, -canvas.height/100, canvas.height/100, 0.1, 100 ); //Set orthogonal view
    }
    
    var eye = [0, up_down, forward_back];
    cameraEye = eye;
    //console.log(cameraEye);
    //console.log(left_right);
    mat4.lookAt(view_matrix, eye, [left_right,0,0], [0,1,0]); //Set the camera matrix
    mat4.translate(view_matrix, view_matrix, [op+approach, 0, approach]);

    
    //mat4.translate(view_matrix, view_matrix, [0,0,-1]);
    
    


    mat4.translate(trans_matrix, identityMatrix, translate);      //Set the translation
    mat4.rotate(rotate_matrix, identityMatrix, glMatrix.toRadian(deg_angle), rot_axis); //Set the rotation
    mat4.scale(scale_matrix, identityMatrix, scale); //Set the scale

    mat4.multiply(result_matrix, trans_matrix, rotate_matrix); //translate*rotate
    mat4.multiply(mov_matrix, result_matrix, scale_matrix);
    
    var modelView_matrix = new Float32Array(16);
    var normal_matrix = new Float32Array(9);
    mat4.multiply(modelView_matrix, view_matrix, mov_matrix);
    mat3.normalFromMat4(normal_matrix, modelView_matrix);
    
    

    

    gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
    gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
    gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);
    gl.uniformMatrix3fv(normalMatrix, false, normal_matrix);

    gl.uniform3fv(eyePosition, [0,0,forward_back]);
    
    if (LeftLight){
        L_Switch = 1.0;  
    }
    else if(!LeftLight){    
        L_Switch = 0.0;
    }

    if(rightLight){
        R_Switch =1.0;
    }else{
        R_Switch = 0.0;
    }

    if(topMovingLight){
        top_switch = 1.0;
    }
    else{
        top_switch = 0.0;
    }
         
    if(headSpotLight){
        headSpotLight_switch = 1.0;
    }
    else{
        headSpotLight_switch = 0.0;
    }

    if(mouseSpotLight){
        mouseSpotLight_switch = 1.0;
    }
    else{
        mouseSpotLight_switch = 0.0;
    }

    //Specify Material color
    gl.uniform3fv(Ka, objectMaterial.materialAmbient);
    gl.uniform3fv(Kd, objectMaterial.materialDiffuse);
    gl.uniform3fv(Ks, objectMaterial.materialSpecular);
    gl.uniform1f(u_shininess, objectMaterial.materialShininess);


    //Light switch for Fixed Left-point light, Right-point light and their total ambience
    gl.uniform1f(mode_ambient, lightAmbient/33.33);
    gl.uniform1f(mode_left, L_Switch);
    gl.uniform1f(mode_right, R_Switch);
    gl.uniform1f(mode_topMovingLight, top_switch);
    gl.uniform1f(mode_headSpotLight, headSpotLight_switch);
    gl.uniform1f(mode_mouseSpotLight, mouseSpotLight_switch);
    gl.uniform1f(mode_shadow, 0.0);
    gl.uniform1f(mode_shadow2, 0.0);
    
    
    

    //Specify position of moving point light 
    gl.uniform3fv(u_movingPointLightPosition, [0, 4.8, 0]);
    gl.uniform3fv(pointLightDiffusionRight, [(redRightLight/255.0)*1.0, (greenRightLight/255.0)*1.0, (blueRightLight/255.0)*1.0]);
    
    //Specify position of left point light
    gl.uniform3fv(pointLightPositionLeft, [-14, 0 ,leftLightPosZ]);
    gl.uniform3fv(pointLightDiffusionLeft, [(redLeftLight/255.0)*1.0, (greenLeftLight/255.0)*1.0, (blueLeftLight/255.0)*1.0]);

     //Specify position of right point light
     gl.uniform3fv(pointLightPositionRight, [14, 0, rightLightPosZ]);

    //Specify position, direction and angle of Head point light
    gl.uniform3fv(u_headSpotLightPosition, [left_right,0,5]);
    gl.uniform3fv(u_headSpotLightDirection, [0,0,-1]);
    var radian = Math.PI * 10 / 180.0;
    gl.uniform1f(u_headSpotLightLimit, Math.cos(radian));

    //Specify position, direction and angle of mouse spot light
    gl.uniform3fv(u_mouseSpotLightPosition, [mouse_left_right,mouse_up_down,5]);
    gl.uniform3fv(u_mouseSpotLightDirection, [0,0,-1]);
    var mouse_radian = Math.PI * 15 / 180.0;
    gl.uniform1f(u_mouseSpotLightLimit, Math.cos(mouse_radian));

    //Color code of object in scene
    gl.uniform3fv(Objectcode, colorCode);

}



/*============== Setting Textures ====================*/
 function createTexture(my_image){
     //Create and bind texture
     var texture = gl.createTexture();
     gl.bindTexture(gl.TEXTURE_2D, texture);

    //Flip texture
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

     //Wrapping Parameters that determines what happens if s and t are outside the range(0,1)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

   //Allow us to use area averaging instead of point samples(Enlarges or shrinks texture map)
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
   gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    //Store the image in the GPU texture object.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, my_image);

    gl.activeTexture(gl.TEXTURE0);
    
}



/* This function draws all shapes in the scene with two arguments .
args: primitives - primitive shape type 
        translate  - the coordinate where the shape will be translated- matrix
*/


var angle = 0;
var cube_angle = 0;
var cube_flag = true;


var F_angle = 0;
var fan_flag = false;
var fan_angle =0;
var fan_rod_angle = 0;
var fan_blade_angle = 0;

function drawA(primitive, all_translate){

    /*======= Set View port and clear buffer =======*/
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT| gl.DEPTH_BUFFER_BIT);

    /*=========Point to Stage Buffers===========*/
     gl.bindBuffer(gl.ARRAY_BUFFER, stage_buffer);
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, stage_index);
     var coord = gl.getAttribLocation(shaderProgram, "coordinates");
     gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
     gl.enableVertexAttribArray(coord);

    //Set stage normals
    gl.bindBuffer(gl.ARRAY_BUFFER, stageNormalBuffer);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);

    //Set stage texture
    // gl.bindBuffer(gl.ARRAY_BUFFER, stageTextureBuffer);
    // var a_texture_coordinate = gl.getAttribLocation(shaderProgram, "a_texture_coordinate");
    // gl.vertexAttribPointer(a_texture_coordinate, 2, gl.FLOAT, false,0,0) ;
    // gl.enableVertexAttribArray(a_texture_coordinate);

    //Draw stage
    //setUniformAttribute(all_translate.translateStage, stageMaterial, 0, axis_rotations.stage_axis, [-22.1647,31.0312,-4.65275]);
    //createTexture(document.getElementById("floor"));
    //gl.drawElements(primitive, stageIndex.length, gl.UNSIGNED_SHORT,0);


    /*======= Point to Podium 1 Buffers =======*/
    gl.bindBuffer(gl.ARRAY_BUFFER, cube_buffer);// Bind vertex buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cube_index_buffer);// Bind index buffer object
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");// Get the attribute location for position
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); // Point an attribute to the currently bound VBO
    gl.enableVertexAttribArray(coord);// enable the attribute

    //set podium 1 texture coordinate
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeTextureBuffer);
    var a_texture_coordinate = gl.getAttribLocation(shaderProgram, "a_texture_coordinate");
    gl.vertexAttribPointer(a_texture_coordinate, 2, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(a_texture_coordinate);

    //Set podium 1 normals
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);

    //Draw  podium 1
    if(cube_flag){ cube_angle = angle; }
    setUniformAttribute(all_translate.translate0, cubeMaterial, 90, axis_rotations.cube_axis, [0.5,0.5,0.5], podiumColorCode1);
    createTexture(document.getElementById("my_image"));
    //gl.drawElements(primitive, cubeVertexIndices.length, gl.UNSIGNED_SHORT,0);
    render(cubeVertexIndices.length);


    /*================Podiuim 2 =========*/
    setUniformAttribute(all_translate.translatepoduim2, cubeMaterial, 90, axis_rotations.cube_axis, [0.5,0.5,0.5], podiumColorCode2);
    createTexture(document.getElementById("my_image"));
    //gl.drawElements(primitive, cubeVertexIndices.length, gl.UNSIGNED_SHORT,0);
    render(cubeVertexIndices.length);

    /*================Podium 3=========*/
    setUniformAttribute(all_translate.translatepoduim3, cubeMaterial, 90, axis_rotations.cube_axis, [0.5,0.5,0.5], podiumColorCode3);
    createTexture(document.getElementById("my_image"));
    //gl.drawElements(primitive, cubeVertexIndices.length, gl.UNSIGNED_SHORT,0);
    render(cubeVertexIndices.length)



    if(fan_flag){
        fan_angle = F_angle
    }else{
        fan_angle=0
        
    }

    /*===================Fan Hierarchical Model ===============*/
    
    /*======= Point to Fan Rod Buffers =======*/
    gl.bindBuffer(gl.ARRAY_BUFFER, fan_Rod_buffer);// Bind vertex buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, fan_Rod_index_buffer);// Bind index buffer object
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");// Get the attribute location for position
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); // Point an attribute to the currently bound VBO
    gl.enableVertexAttribArray(coord);// enable the attribute

    //set cube texture coordinate
    // gl.bindBuffer(gl.ARRAY_BUFFER, cubeTextureBuffer);
    // var a_texture_coordinate = gl.getAttribLocation(shaderProgram, "a_texture_coordinate");
    // gl.vertexAttribPointer(a_texture_coordinate, 2, gl.FLOAT, false,0,0) ;
    // gl.enableVertexAttribArray(a_texture_coordinate);

    //Set rod normals
    gl.bindBuffer(gl.ARRAY_BUFFER, fan_Rod_Normal_buffer);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);

    //Draw rod
    setUniformAttribute(all_translate.translateFanRod, ruby, fan_angle*5, axis_rotations.fanRod, [1,1,1], fanRodColorCode);
    createTexture(document.getElementById("fan"));
    //gl.drawElements(primitive, fan_middle_index.length, gl.UNSIGNED_SHORT,0);
    render(fan_middle_index.length)

        

    /*======= Point to Fan Blade 1 Buffers =======*/
    gl.bindBuffer(gl.ARRAY_BUFFER, fan_blade_buffer1);// Bind vertex buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, fan_blade_index1);// Bind index buffer object
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");// Get the attribute location for position
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); // Point an attribute to the currently bound VBO
    gl.enableVertexAttribArray(coord);// enable the attribute

    //set cube texture coordinate
    // gl.bindBuffer(gl.ARRAY_BUFFER, cubeTextureBuffer);
    // var a_texture_coordinate = gl.getAttribLocation(shaderProgram, "a_texture_coordinate");
    // gl.vertexAttribPointer(a_texture_coordinate, 2, gl.FLOAT, false,0,0) ;
    // gl.enableVertexAttribArray(a_texture_coordinate);

    //Set fan  blade 1 normals
    gl.bindBuffer(gl.ARRAY_BUFFER, fan_blade_Normal1);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);

    //Draw fan blade 1
    setUniformAttribute(all_translate.translateFanBlade1, ruby, fan_angle, axis_rotations.blade2, [0.7,0.5,0.3], fanBlade1ColorCode);
    createTexture(document.getElementById("fan"));
    //gl.drawElements(primitive, fan_bladesIndics1.length, gl.UNSIGNED_SHORT,0);
    render(fan_bladesIndics1.length);

    
    /*======= Point to Fan Blade 2 Buffers =======*/
    gl.bindBuffer(gl.ARRAY_BUFFER, fan_blade_buffer2);// Bind vertex buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, fan_blade_index2);// Bind index buffer object
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");// Get the attribute location for position
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); // Point an attribute to the currently bound VBO
    gl.enableVertexAttribArray(coord);// enable the attribute

    //set cube texture coordinate
    // gl.bindBuffer(gl.ARRAY_BUFFER, cubeTextureBuffer);
    // var a_texture_coordinate = gl.getAttribLocation(shaderProgram, "a_texture_coordinate");
    // gl.vertexAttribPointer(a_texture_coordinate, 2, gl.FLOAT, false,0,0) ;
    // gl.enableVertexAttribArray(a_texture_coordinate);

    //Set fan blade 2 normals
    gl.bindBuffer(gl.ARRAY_BUFFER, fan_blade_Normal2);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);

    //Draw fan blade 2
    setUniformAttribute(all_translate.translateFanBlade2, ruby, fan_angle, axis_rotations.blade2, [0.5,0.5,0.7], fanBlade2ColorCode);
    createTexture(document.getElementById("fan"));
    //gl.drawElements(primitive, fan_bladesIndics2.length, gl.UNSIGNED_SHORT,0);
    render(fan_bladesIndics2.length);



    /*======= Point to Monkey Buffers =======*/
    gl.bindBuffer(gl.ARRAY_BUFFER, monkey_buffer);// Bind vertex buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, monkey_index);// Bind index buffer object
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");// Get the attribute location for position
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); // Point an attribute to the currently bound VBO
    gl.enableVertexAttribArray(coord);// enable the attribute

    //set monkey texture coordinate
    gl.bindBuffer(gl.ARRAY_BUFFER, monkey_Texturebuffer);
    var a_texture_coordinate = gl.getAttribLocation(shaderProgram, "a_texture_coordinate");
    gl.vertexAttribPointer(a_texture_coordinate, 2, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(a_texture_coordinate);

    //Set monkey normals
    gl.bindBuffer(gl.ARRAY_BUFFER, monkey_normal_buffer);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);

    //Draw monkey
    setUniformAttribute(all_translate.translateMonkey, cubeMaterial, -90, axis_rotations.monkey_axis, [1,1,1], monkeyColorCode);
    createTexture(document.getElementById("monkey"));
    var monkeyindexL = [].concat.apply([], try4.meshes[5].faces);
    //gl.drawElements(primitive, monkeyindexL.length, gl.UNSIGNED_SHORT,0);
    render(monkeyindexL.length)


    /*======= Point to Main Light Buffers =======*/
    gl.bindBuffer(gl.ARRAY_BUFFER, main_light_buffer);// Bind vertex buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, main_light_index);// Bind index buffer object
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");// Get the attribute location for position
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); // Point an attribute to the currently bound VBO
    gl.enableVertexAttribArray(coord);// enable the attribute



    //Set Main Light normals
    gl.bindBuffer(gl.ARRAY_BUFFER, main_normal_bufer);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);

    //Set Main light textures
    gl.bindBuffer(gl.ARRAY_BUFFER, mainLightTextureBuffer);
    var a_texture_coordinate = gl.getAttribLocation(shaderProgram, "a_texture_coordinate");
    gl.vertexAttribPointer(a_texture_coordinate, 2, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(a_texture_coordinate);


    //Draw Main Light
    setUniformAttribute(all_translate.translatemainLight, mainLightMaterial, 0, axis_rotations.mainLight, [0.506481,0.506481,0.506481], mainLightColorCode);
    createTexture(document.getElementById("mainLight"));
    var mainLight = [].concat.apply([], try4.meshes[8].faces);
    //gl.drawElements(primitive, mainLight.length, gl.UNSIGNED_SHORT,0);
    render(mainLight.length);







     /*======= Point to Picture1 Buffers =======*/
     gl.bindBuffer(gl.ARRAY_BUFFER, picture1_buffer)
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, picture1_index_buffer);
     var coord = gl.getAttribLocation(shaderProgram, "coordinates");
     gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 
     gl.enableVertexAttribArray(coord);
 
 
      //Set picture1 normals
      gl.bindBuffer(gl.ARRAY_BUFFER, picture1NormalBuffer);
      var normal = gl.getAttribLocation(shaderProgram, "normal");
      gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
      gl.enableVertexAttribArray(normal);
 
 
      //Set picture1 texture coordinates
     gl.bindBuffer(gl.ARRAY_BUFFER, picture1TextureBuffer);
     var a_texture_coordinate = gl.getAttribLocation(shaderProgram, "a_texture_coordinate");
     gl.vertexAttribPointer(a_texture_coordinate, 2, gl.FLOAT, false,0,0);
     gl.enableVertexAttribArray(a_texture_coordinate);
 
      //Drawing picture1
     setUniformAttribute(all_translate.translatePicture1, cubeMaterial, 90, axis_rotations.picture_axis, [1,1,1], picture1ColorCode);
     createTexture(document.getElementById("picture1"));
     //gl.drawElements(primitive, pictureIndices.length, gl.UNSIGNED_SHORT,0);
     render(pictureIndices.length);



     /*======= Point to Picture2 Buffers =======*/
     gl.bindBuffer(gl.ARRAY_BUFFER, picture2_buffer)
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, picture2_index_buffer);
     var coord = gl.getAttribLocation(shaderProgram, "coordinates");
     gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 
     gl.enableVertexAttribArray(coord);
 
 
      //Set picture2 normals
      gl.bindBuffer(gl.ARRAY_BUFFER, picture2NormalBuffer);
      var normal = gl.getAttribLocation(shaderProgram, "normal");
      gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
      gl.enableVertexAttribArray(normal);
 
 
      //Set picture2 texture coordinates
     gl.bindBuffer(gl.ARRAY_BUFFER, picture2TextureBuffer);
     var a_texture_coordinate = gl.getAttribLocation(shaderProgram, "a_texture_coordinate");
     gl.vertexAttribPointer(a_texture_coordinate, 2, gl.FLOAT, false,0,0);
     gl.enableVertexAttribArray(a_texture_coordinate);
 
      //Drawing picture2
     setUniformAttribute(all_translate.translatePicture2, cubeMaterial, 90, axis_rotations.picture_axis, [1,1,1], picture2ColorCode);
     createTexture(document.getElementById("picture2"));
     //gl.drawElements(primitive, pictureIndices.length, gl.UNSIGNED_SHORT,0);
     render(pictureIndices.length);


     //Drawing picture3
     setUniformAttribute(all_translate.translatePicture3, triangle_prism_Material, 90, axis_rotations.picture_axis, [1,1,1], picture3ColorCode);
     createTexture(document.getElementById("picture3"));
     //gl.drawElements(primitive, pictureIndices.length, gl.UNSIGNED_SHORT,0);
     render(pictureIndices.length);

     //Drawing picture4
     setUniformAttribute(all_translate.translatePicture4, cubeMaterial, 90, axis_rotations.picture_axis, [1,1,1], picture4ColorCode);
     createTexture(document.getElementById("picture4"));
     //gl.drawElements(primitive, pictureIndices.length, gl.UNSIGNED_SHORT,0);
     render(pictureIndices.length);



     /*======= Point to Room Buffers =======*/
    gl.bindBuffer(gl.ARRAY_BUFFER, room_buffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, room_index_buffer);
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 
    gl.enableVertexAttribArray(coord);

     //Set room normals
     gl.bindBuffer(gl.ARRAY_BUFFER, roomNormalBuffer);
     var normal = gl.getAttribLocation(shaderProgram, "normal");
     gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
     gl.enableVertexAttribArray(normal);

     //Set room texture coordinates
    gl.bindBuffer(gl.ARRAY_BUFFER, roomTextureBuffer);
    var a_texture_coordinate = gl.getAttribLocation(shaderProgram, "a_texture_coordinate");
    gl.vertexAttribPointer(a_texture_coordinate, 2, gl.FLOAT, false,0,0) ;
    gl.enableVertexAttribArray(a_texture_coordinate);

     //Drawing room
    setUniformAttribute(all_translate.translateRoom, roomMaterial, 88.9, axis_rotations.room_axis, [-22.3398, 31.1725, -4.90595], roomColorCode);
    createTexture(document.getElementById("room"));
    //gl.drawElements(primitive, roomIndex.length, gl.UNSIGNED_SHORT,0);
    render(roomIndex.length);



     /*======= Point to Dog Buffers =======*/
     gl.bindBuffer(gl.ARRAY_BUFFER, dog_buffer)
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, dog_index_buffer);
     var coord = gl.getAttribLocation(shaderProgram, "coordinates");
     gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 
     gl.enableVertexAttribArray(coord);
 
    //Set dog normals
    gl.bindBuffer(gl.ARRAY_BUFFER, dog_normal_buffer);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);

      //Drawing dog
     setUniformAttribute(all_translate.translateDog, turquise, 90, axis_rotations.dog_axis, [0.588401, 0.588401, 0.588401], dogColorCode);
     
     createTexture(document.getElementById("room"));
     //gl.drawElements(primitive, dogIndex.length, gl.UNSIGNED_SHORT,0);
    render(dogIndex.length);

    /*======= Point to Cup Buffers =======*/
    gl.bindBuffer(gl.ARRAY_BUFFER, cup_buffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cup_index_buffer);
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 
    gl.enableVertexAttribArray(coord);

    //Set Cup normals
    gl.bindBuffer(gl.ARRAY_BUFFER, cup_normal_buffer);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);

    //Drawing Cup
    setUniformAttribute(all_translate.translateCup, gold, 90, axis_rotations.cup_axis, [1, 1, 1], cupColorCode);
    createTexture(document.getElementById("room"));
    //gl.drawElements(primitive, cupIndex.length, gl.UNSIGNED_SHORT,0);
    render(cupIndex.length);


    /*======= Point to Kettle Buffers =======*/
    gl.bindBuffer(gl.ARRAY_BUFFER, kettle_buffer)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, kettle_index_buffer);
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 
    gl.enableVertexAttribArray(coord);

    //Set kettle normals
    gl.bindBuffer(gl.ARRAY_BUFFER, kettle_normal_buffer);
    var normal = gl.getAttribLocation(shaderProgram, "normal");
    gl.vertexAttribPointer(normal, 3, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(normal);

    //Drawing kettle
    setUniformAttribute(all_translate.translateKettle, cubeMaterial, 90, axis_rotations.kettle_axis, [10.0882,10.0882,10.0882], kettleColorCode);
    createTexture(document.getElementById("room"));
    //gl.drawElements(primitive, kettleIndex.length, gl.UNSIGNED_SHORT,0);
    render(kettleIndex.length);

    animateShape();
    
}





var scale_step = 1;
var top_light_step = 1;


function AmbientLight(){
    lightAmbient = document.getElementById("myRange").value;
    console.log(lightAmbient)
}

function moveLeftLight(){
    leftLightPosZ = document.getElementById('moveLeft').value;
    console.log(leftLightPosZ)

}

function colorLeftLight(){
    redLeftLight = document.getElementById('colorLeftX').value;
    greenLeftLight = document.getElementById('colorLeftY').value;
    blueLeftLight = document.getElementById('colorLeftZ').value;
}


function moveRightLight(){
    rightLightPosZ = document.getElementById('moveRight').value;
    console.log(rightLightPosZ)

}


function colorRightLight(){
    redRightLight = document.getElementById('colorRightX').value;
    greenRightLight = document.getElementById('colorRightY').value;
    blueRightLight = document.getElementById('colorRightZ').value;
}



var dog_step = -1;
var monkey_step = -1;
var kettle_step = -1;
var cup_step = -1;
function animateShape(){
    //Camera Movement
    if(forward_flag){
        forward_back -= 0.3;
        forward_flag = false;
    }
    if (backward_flag){
        forward_back+=0.3;
        backward_flag= false
    }

    if (left_flag){
        left_right +=0.3;
        left_flag = false;
    }
    if(right_flag){
        left_right -=0.3;
        right_flag = false;
    }
    
    if(up_flag){
        if (up_down > 3.5){ up_down = 3.5 }
        up_down+=.3;
        console.log(up_down);
        up_flag = false
    }
    if(down_flag){
        console.log('ninin');
        if (up_down < -3.5){ return }
        up_down-=.3;
        console.log(up_down);
        down_flag = false
    }

    if(approach_flag){
        approach += 0.3;
        approach_flag = false
    }

    if(approachRight_flag){
        op -= 0.6;
        approach += 0.3;
        approachRight_flag = false;
    }

    //Cube: Rotation on X and Z; Butterfly: Rotation on Y
    //angle = performance.now() / 50 / 4 * 2 * Math.PI;

    //Fan Hiecharical Angle Control
    F_angle = performance.now() / 5 /4 *2 * Math.PI


    //Top-Light back and forth
    if(topLightX >= 25){
        top_light_step = top_light_step * -1;  
    }

    if(topLightX <= -25){
        top_light_step = top_light_step * -1;
    }

    topLightX += 0.2 * top_light_step;

    if(pickedObject == "dog"){
        //Animate Dog
        if(all_translations.translateDog[1] >= -1){
            dog_step = dog_step * -1
        }

        if(all_translations.translateDog[1] <= -3){
            dog_step = dog_step * -1
        }
        all_translations.translateDog[1] += 0.09 * dog_step;
        //console.log(all_translations.translateDog[1])

    }

    if(pickedObject == "monkey"){
         //Animate Monkey
         if(all_translations.translateMonkey[1] >= 2){
            monkey_step = monkey_step * -1;
        }

        if(all_translations.translateMonkey[1] <= 0){
            monkey_step = monkey_step * -1;
        }
        all_translations.translateMonkey[1] += 0.09 * monkey_step;
        //console.log(all_translations.translateMonkey[1])

    }


    if(pickedObject == "kettle"){
        //Animate Kettle
        if(all_translations.translateKettle[1] >= 2){
           kettle_step = kettle_step * -1;
       }

       if(all_translations.translateKettle[1] <= 0){
            kettle_step = kettle_step * -1;
       }
       all_translations.translateKettle[1] += 0.09 * kettle_step;
       //console.log(all_translations.translateKettle[1]);
   }

   if(pickedObject == "cup"){
        //Animate Cup
        if(all_translations.translateCup[1] >= 2){
           cup_step = cup_step * -1;
       }

       if(all_translations.translateCup[1] <= 0){
            cup_step = cup_step * -1;
       }
       all_translations.translateCup[1] += 0.09 * cup_step;
       //console.log(all_translations.translateCup[1]);
   }
    
    
}


function show() {
    requestAnimationFrame(show);
    drawA(gl.TRIANGLES, all_translations);
}


 /*============== Draw a 3D object ====================*/
 setup();
 initBuffers();
 show();

