import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)


const Work =()=>import ('../views/work/Work')
const Serve =()=>import ('../views/serve/Serve')
const Login =()=>import ('../views/login/Login')

const Index =()=>import ('../views/work/Index')
const Scheduling =()=>import('../views/work/Scheduling')
const Video =()=>import('../views/work/Video')
const Text =()=>import('../views/work/Text')
const Register =()=>import('../views/register/Register.vue')


const VideoList =()=>import('../views/serve/serveList/VideoList')
const TextList =()=>import('../views/serve/serveList/TextList')
const AnalyseList =()=>import('../views/serve/serveList/AnalyseList')
const ConsultationList =()=>import('../views/serve/serveList/ConsultationList')

const VideoInformation =()=>import('../views/information/VideoInformation')

const First =()=>import('../views/index/Index')

//重写部分
const Index2=()=>import('../view2/work2/index/Index2')
const Work2=()=>import("../view2/work2/Work2")
const Login2 =()=>import ('../view2/login/Login')
const Text2=()=>import('../view2/work2/text/Text')
const Scheduling2=()=>import('../view2/work2/scheduling/Scheduling')
const Video2 =()=>import('../view2/work2/video/Video')
const VideoInformation2 =()=>import('../view2/work2/videoInformation/VideoInformation')
const Settlement =()=>import('../view2/work2/settlement/Settlement')
const LitigationList =()=>import('../view2/work2/litigation/LitigationList')
const MyLitigation =()=>import('../view2/work2/litigation/MyLitigation')











const routes = [
  {
    path: '/',
    redirect: '/login',
    
  },
  
  // {
  //   path:'/work',
  //   component: Work,
  //   redirect:'/work/index',
  //   children:[
  //     {path: '/work/index', component: Index},
  //     {path:'/work/scheduling',component:Scheduling},
  //     {path:'/work/video',component:Video},
  //     {path:'/work/text',component:Text},
  //     {path:'/work/videoInformation',component:VideoInformation},
     
      

  //   ]
    
  // },
  {
    path:'/work',
    component: Work2,
    // redirect:'/work2/index2',
    children:[
      {path: '/work/index', component: Index2},
      {path:'/work/scheduling',component:Scheduling2},
      {path:'/work/video',component:Video2},
      {path:'/work/text',component:Text2},
      {path:'/work/videoInformation',component:VideoInformation2},
      {path:'/work/settlement',component:Settlement},
      {path:'/work/litigation-list',component:LitigationList},
      {path:'/work/my-litigation',component:MyLitigation}
    

    ]
    
  },
  // {
  //   path:'/serve',
  //   component: Serve,
  //   redirect:'/serve/videoList',
  //   children:[
  //     {path: '/serve/videoList', component:VideoList},
  //     {path: '/serve/textList', component:TextList},
  //     {path: '/serve/analyseList', component:AnalyseList},
  //     {path: '/serve/consultationList', component:ConsultationList}
  //   ]
      
    
    
  // },
  {
    path: '/login',
    component: Login2
  },
  // {
  //   path: '/login',
  //   component: Login
  // },
  {
    path: '/register',
    component: Register
  },
 
  {  
    path: '/index',
    name:'Index',
    component: First
  },
  
]

const router = new VueRouter({
  routes
})

export default router
