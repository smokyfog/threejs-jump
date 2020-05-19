// 定义元素的宽高
var width = 400
var height = 400

//定义 canvas
var canvas = document.getElementById('demo-canvas')
// 定义webgl的Renderer
var renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
// 定义绘制的场景
var scene = new THREE.Scene()
// 定义一个正胶相机相机
// 定义上下左右前后的情况
var camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, -1000, 1000)

// 设置场景颜色
renderer.setClearColor(new THREE.Color(0x000000, 1.0))
// 设置场景大小
renderer.setSize(400, 400)

// shape对象 绘制三角形
var triangleShape = new THREE.Shape()
triangleShape.moveTo(0, 100)
triangleShape.lineTo(-100, -100)
triangleShape.lineTo(100, -100)
triangleShape.lineTo(0, 100)

// geometry: 几何体   创建一个几何体
var geometry = new THREE.ShapeGeometry(triangleShape)
// (素材)颜色为红色的基础的材质 
var material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  // 面  默认为oneSide(一个面)
  side: THREE.DoubleSide  // 渲染正反面
})
// geometry 形状对应的坐标情况 几何体对应的形状
// material 材质 对顶点序列做上色
var mesh = new THREE.Mesh(geometry, material)
// 设置未知
mesh.position.x = 0 // 原点
mesh.position.y = 0 // 原点
 // z轴不为原点 因为相机原点放在原点 相机是沿着z轴的负方向望进去
mesh.position.z = 1
// 添加mesh到场景中
scene.add(mesh)

// 设置相机位置
camera.position.x = 0
camera.position.y = 0
camera.position.z = 0
// 从(0, 0, 0)的位置看向(0, 0, 1)的位置
camera.lookAt(new THREE.Vector3(0, 0, 1))

var currentAngle = 0
var lastTimeStamp = Date.now()

var animate = function () {
  var now = Date.now()
  var duration = now - lastTimeStamp
  lastTimeStamp = now
  currentAngle = currentAngle + duration / 1000 * Math.PI
}

var render = function () {
  animate()
  // 绕y轴旋转
  mesh.rotation.set(0, 0, currentAngle)
  // 在场景中渲染相机
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()


 