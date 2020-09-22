<template>
  <div class="register">
    <div class="bgc"></div>
    <div v-if="i===1" class="register_box">
      <div class="box_left">
        <img
          style="width:100%;height:100%;border-radius:16px 0px 0 16px;position: absolute"
          :src="imgUrl"
        />
        <div class="pic_title">
          <img
            style="width:80%;height:60%"
            src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/logo.png"
          />
        </div>
      </div>
      <div class="box_right">
        <h1 style="font-size:3.6rem">注册</h1>
        <el-form :model="form" :rules="rules" ref="form">
          <!-- <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user-solid" v-model="form.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" v-model="form.password" placeholder="密码"></el-input>
          </el-form-item>-->
          <el-form-item prop="realName">
            <el-input prefix-icon="el-icon-user" v-model="form.realName" placeholder="真实姓名"></el-input>
          </el-form-item>
          <el-form-item prop="lawFiem">
            <el-input prefix-icon="el-icon-office-building" v-model="form.lawFiem" placeholder="律所"></el-input>
          </el-form-item>
          <el-form-item prop="cardNumber">
            <el-input
              prefix-icon="el-icon-document-remove"
              v-model="form.cardNumber"
              placeholder="执业证号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userPhone">
            <el-input prefix-icon="el-icon-phone" v-model="form.userPhone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="region">
            <el-cascader prefix-icon="el-icon-location" placeholder="选择工作地区" v-model="form.region" :options="options" :props="{ value:'name',label:'name',children:'sub' }"  @change="handleChange"></el-cascader>
          </el-form-item>
           <!-- <el-form-item prop="mail">
            <el-input prefix-icon="el-icon-message" v-model="form.mail" placeholder="邮箱"></el-input>
          </el-form-item> -->
        

          <span style="font-size:16px;margin-bottom:10px;display:block">选择角色</span>
          <el-form-item prop="role">
            <div class="box1-radios-box">
              <el-radio-group v-model="form.role" size="mini">
                <el-radio v-for="item in role" :key="item.roleName" :label="item.roleName" border></el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-form>

        <div class="next_buttom" @click="submitForm('form')">下一步</div>
        <div class="agreement_box">
          <span class="agree_text">
            已有账号，
            <a href="index.html" class="link">登录</a>
          </span>
          <span class="agree_text">
            注册即代表您已阅读并同意
            <span
              style="color: rgb(100, 158, 253);
  text-decoration: none;"
              @click="showWindow"
            >《注册协议》</span>
          </span>
        </div>
      </div>
    </div>
    <div v-if="i===2" class="register_box2">
      <div class="box_left">
        <img
          style="width:100%;height:100%;border-radius:16px 0px 0 16px;position: absolute"
          :src="imgUrl"
        />
        <div class="pic_title">
          <img
            style="width:80%;height:60%"
            src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/banner_pic/logo.png"
          />
        </div>
      </div>
      <div class="box_right">
        <h1 style="font-size:3.6rem;margin-bottom:-1rem">注册</h1>
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item prop="field">
            <div style="width:65%">
              <span class="title_text">擅长类别(最多选择4个)</span>
              <el-checkbox-group v-model="form.field" size="mini">
                <el-checkbox
                  v-for="item in firmOption"
                  :key="item. professionName"
                  :label="item. professionName"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>

          <div style="width:100%;display:flex;align-items: center;flex-direction: column;">
            <div style="width:65%;display:flex;">
              <div style="width:50%">
                <span v-if="form.pic_1=='1'" class="title_text">上传头像</span>
                <span v-if="form.pic_1!=='1'" class="title_text">点击更换图片</span>
              </div>
              <div style="width:50%">
                <span v-if="form.pic_2=='1'" class="title_text">上传证件图</span>
                <span v-if="form.pic_2!=='1'" class="title_text">点击更换图片</span>
              </div>
            </div>
            <div style="display:flex;width:65%">
              <div style="width:50%;display:flex">
                <div id="up_father1">
                  <div class="add_pic" id="up_pic1">
                    <img
                      style="widh:3vh;height:3vh"
                      src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/wetchatapplet_mailv/images/tabBar/%E5%8A%A0%E5%8F%B7.svg"
                    />
                  </div>
                </div>
                <div
                  v-if="form.pic_1!=='1'"
                  style="width:7rem;height:7rem; border: 1px black solid;margin-left:1rem"
                >
                  <img style="width:100%;height:100%" :src="form.pic_1" />
                </div>
              </div>

              <div style="width:50%;display:flex">
                <div id="up_father2">
                  <!-- <span class="title_text">上传证件图</span> -->
                  <div class="add_pic" id="up_pic2">
                    <img
                      style="widh:3vh;height:3vh"
                      src="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/wetchatapplet_mailv/images/tabBar/%E5%8A%A0%E5%8F%B7.svg"
                    />
                  </div>
                </div>
                <div v-if="pdfName!='1'">
                  <div>
                    <span>pdf文件无法预览</span>
                  </div>
                  <div>
                    <a v-bind="{href:form.pic_2}">{{pdfName}}</a>
                  </div>
                </div>
                <div
                  v-if="form.pic_2!=='1' & pdfName=='1'"
                  style="width:7rem;height:7rem; border: 1px black solid;margin-left:1rem"
                >
                  <img style="width:100%;height:100%" :src="form.pic_2" />
                </div>
              </div>
            </div>
          </div>

          <div style="width:100%;display:flex;justify-content: center;">
            <div style="width:65%">
              <span>请尽量使用长宽相等的照片作为头像，请添加jpg,jpeg,png格式的图片，证件图可选择pdf扫描件</span>
            </div>
          </div>

          <el-form-item prop="textarea">
            <div style="width:65%;margin:2rem 0 0 0">
              <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.textarea"></el-input>
            </div>
          </el-form-item>
        </el-form>

        <div class="next_buttom" id="postfiles" @click="submitForm2('form')">提交注册信息</div>
        <div class="agreement_box">
          <span class="agree_text">
            已有账号，
            <a href="index.html" class="link">登录</a>
          </span>
          <span class="agree_text">
            注册即代表您已阅读并同意
            <span
              style="color: rgb(100, 158, 253);
  text-decoration: none;"
              @click="showWindow"
            >《注册协议》</span>
          </span>
        </div>
      </div>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="700px"
      :showClose="showClo"
      :close-on-click-modal="showClo"
    >
      <div style="width:100%;display:flex;justify-content:center">
        <h2>注册协议</h2>
      </div>

      <p>欢迎您使用上海麦律网络科技有限公司（以下简称“上海麦律”）麦律法律服务平台（以下简称“麦律平台”或“平台”）及相关服务。下述条款和条件即构成您就平台使用许可所达成的协议（以下简称“本协议”），本协议是由您与上海麦律共同缔结，对您和上海麦律具有同等的合同效力。</p>
      <p>一、协议内容的确认</p>
      <p>
        （一）请您务必审慎阅读本协议中的全部条款内容，特别是授权条款、免责或者限制责任的条款、法律适用和争议的条款。尤其注意重点阅读本协议中字体加粗的部分，并保证您能够充分理解并接受本协议中的全部条款内容，如您对本协议的内容或者页面的提示信息有任何疑问或者异议，请您立即停止注册，并勿勾选任何内容或进行任何操作。
        （二）如您按照注册页面的提示进行进一步操作，完成包括但不限于填写注册页面的相关信息、阅读并同意本协议中的全部条款等与注册相关的全部流程之后，即视为您已经充分阅读、理解并且接受本协议的全部条款内容，并与上海麦律达成一致，成为麦律平台的注册用户。
        （三）您应当是具备完全民事权利能力和民事行为能力人的自然人，具备法律专业知识、执业技能与执业素养，并在中华人民共和国境内的律师事务所执业。若您不具备前述主体资格，请勿注册及使用麦律平台服务，否则麦律平台有权注销您的账户而不承担任何责任，并有权要求您承担因此给上海麦律造成的损失。
      </p>
      <p>二、相关定义</p>（一）平台，指由上海麦律自主研发、所有、经营的，为有法律服务需求的用户（本协议统称“平台服务需求者”）提供法律咨询服务、信息对接的网上交易平台软件。
      （二）注册用户，指完成正式注册的，并可使用平台开发的产品、功能、服务的自然人、法人或非法人组织。
      注册用户包括平台服务需求者和平台服务提供者。
      平台服务需求者，指的是通过平台发布咨询信息、需求订单等，有法律服务需求，自愿使用平台服务的注册用户。
      平台服务提供者，指的是通过平台专业审核具有法律专业知识、法律执业技能、法律执业素养，有能力提供法律服务的服务律师（本协议统称“您”）。
      （三）平台服务，指的是平台为注册用户提供的所有付费或免费的，现有或即将开发的产品、功能、服务，具体产品、功能、服务内容平台有权自主地设立、变更和修改。目前已设立并开通的平台服务模块包括但不限于合同的起草与修改、合同模板文本下载、函件起草（包括但不限于催款函、律师函、专项法律意见书等）、一对一视频咨询服务等各类法律服务。
      （四）本协议，指的是包括但不限于协议正文、法律声明及所有平台已发布或将来可能发布的各类规则、公告或通知。所有内容均为本协议不可分割的组成部分，与协议正文具有同等的法律效力。
      <p>三、相关授权</p>（一）一旦您向平台作出任何形式的承诺（包括但不限于本协议），且经过平台确认您违反了该承诺，则平台有权立即按您的承诺或协议约定的方式对您的注册账户采取限制措施，包括不限于中止或终止向您提供服务，及中止或终止您向平台服务需求者提供服务，并公示平台您的违约情况。您了解并同意，平台无须就相关确认与您核对事实，或另行征得您的同意，且平台无须就此限制措施或公示行为向您承担任何的责任。
      （二）对于您提供的资料及数据信息，均受平台隐私条款保护，详见《麦律隐私政策》。
      （三）您确认并同意，当您使用平台服务时，平台将向您推送有关消息，以帮助您了解平台服务需求等信息。平台会通过您的联系方式给您发送关于平台的相关新闻、特别优惠或相关活动信息。
      （四）您确认并同意，当您使用平台提供视频咨询服务时，平台将对您的服务过程进行录音或录像，该录音或录像的保存时间、存储方式由平台自行确定，使用规则按照《麦律隐私政策》 执行，且您确认并同意您无权要求平台提供或向平台申请调取。
      <p>四、平台相关使用规范</p>（一）您可通过平台在线服务功能，为向平台服务需求者提供：合同的审核与修订、合同模板文本下载、函件起草（包括但不限于催款函、律师函、专项法律意见书等）、一对一视频咨询服务等各类法律服务。
      （二）您可通过平台的展示、排序、推荐等多种方式进行宣传和推广，使自身更容易获得平台服务需求者的关注和选择。
      （三）您提供在线服务时，应遵守法律法规、执业规范、执业道德，遵守本平台的服务规范。如有违法违规行为导致不利后果发生，您将自行承担所有相应的法律责任。
      （四）对于通过本平台获取的服务需求信息，您不得采取任何方式规避向本平台支付相关费用，包括但不限于向平台服务需求者明示或暗示将相关费用的支付转移至本平台以外进行。
      （五）您在本平台提供服务的过程中，平台服务需求者与您为服务关系。平台服务需求者支付的全部费用由平台收取并享有，平台根据结算规则（包括但不限于平台制定的结算规则、平台与您所在的律师事务所签订的协议），与您所在的律师事务所进行资金结算。您与您所在律师事务所的内部结算与平台无涉。如平台实际未收取平台服务需求者服务费用的，则您亦同意平台无需向您结算并支付服务费用。
      （六）如平台同意您及您所在的律师事务所自行向平台服务需求者提供发票及委托代理合同的，您及您所在的律师事务所应当予以配合提供。
      （七）您明确了解并同意，平台不就您向平台服务需求者提供服务的内容承担任何保证责任或连带责任。
      更多平台使用规范，详见《麦律平台律师服务手册》，您确认您已经详细查阅附件1《麦律平台服务手册》并认可受其约束。
      <p>五、特别声明</p>您系法律服务的实际提供者，因此您及您所在的律师事务所应保证服务质量并承担相应后果，平台不就您的服务内容承担任何保证责任或连带责任。
      <p>六、知识产权</p>（一）您了解及同意，除非麦律平台另行声明，本协议项下服务包含的所有产品、技术、软件、程序、数据及其他信息（包括但不限于文字、图像、图片、照片、音频、视频、图表、色彩、版面设计、电子文档）的所有知识产权（包括但不限于版权、商标权、专利权、商业秘密等）及相关权利均归上海麦律所有。
      您应承诺，除非取得上海麦律书面授权，对于上述权利您不得（并不得允许任何第三人）实施包括但不限于出租、出借、出售、散布、复制、修改、转载、汇编、发表、出版、还原工程、反向汇编、反向编译，或以其它方式发现原始代码等的行为。
      （二）上海麦律或其关联方所有的知识产权和以中文、英文或其他语言体现的商标和品牌，以及其他与上海麦律或其关联方相关的商标、商号、标识、商业外观、服务标记（合称“麦律品牌”），未包括在本协议项下的授权中，其仍然是上海麦律或其关联方的独占的自主财产。未经上海麦律的事先书面同意，任何人都不得在其营销、广告、宣传材料或为其业务经营的目的使用、发布或再制作麦律品牌或任何相似的，或任何包含有麦律品牌或任何相似元素的，名称、商标、域名、标识。若用户违反此约定，上海麦律有权单方解除本协议。本协议终止或提前解除后，您应在2天内将网站上或其他载体上的麦律品牌、网站链接或其他任何标志予以删除、取消。
      （三）您理解并同意授权上海麦律在宣传和推广中使用您的名称、商标、标识，但仅限于表明您属于我们的客户或合作伙伴。
      （四）您在平台上传或发表的内容，您应保证自身为著作权人或已经取得合法授权，并且该内容不会侵犯任何第三方的合法权益。如果第三方提出关于著作权的异议，平台有权根据实际情况删除相关的内容，且有权追究您的相关法律责任。由此给平台或任何第三方造成损失的，您应当承担全部法律责任。
      （五）平台上可由多人参与回复或编辑的内容，包括但不限于问题及补充说明、咨询答复、纠错、答案总结、话题描述、话题结构，所有参与回复或编辑者均同意，相关知识产权归平台所有。
      （六）为有利于知识的分享和传播，您同意将您在平台上发表的全部内容，授予平台免费的、不可撤销的、非独家使用许可，平台有权将该内容用于平台各种形态的产品和服务上，包括但不限于网站以及发表的应用或其他互联网产品。
      （七）您确认第三方若出于非商业目的，将您在平台上发表的内容转载在平台之外的地方，应当在作品的正文开头的显著位置注明原作者姓名（或原作者在平台上注册使用的帐号名称），给出原始链接，注明发表于【平台全称】，并不得对作品进行修改演绎。若需要对作品进行修改，或用于商业目的，第三方应当获得您的单独授权使用该内容。如有第三方侵权的，您同意平台有权就任何主体侵权而单独提起诉讼。
      <p>七、免责或者限制责任</p>（一）平台不就电讯系统或互联网的中断或无法运作、技术故障、计算机错误或病毒、信息损坏或丢失或其它在平台合理控制范围之外的原因而产生的其他任何性质的破坏而向注册用户或任何第三方承担赔偿责任。
      （二）平台致力于为您提供更优质更稳定的服务，运行期间可能会定期或不定期进行平台优化升级，升级期间可能会影响您的使用。具体升级时间和修改内容将会提前在重要页面上提示或以其他方式通知您。若由于您疏忽该通知而导致的自身损失，平台不承担任何责任。
      （四）您须对自己的账户名和密码严格保密，且须对该账户名和密码下发生的所有活动承担责任。您同意：(1)如发现任何人未经授权使用您的账户名或密码，或发生违反保密规定的任何其他情况，您会立即书面通知平台；及(2)确保在每个上网时段结束时，以正确步骤离开网站。无论因任何原因导致您的账户被他人使用或者您不当使用账户而导致的任何损失，平台不承担任何责任。
      （五）因不可抗力而不能或迟延履行本协议项下的任何义务而给您造成的任何损失，平台不承担责任。不可抗力是指不能预见、不能避免、且不能克服的客观事件，包括但不限于：
      1. 宣布或未宣布的国内骚乱、战争、封锁、禁运、政府法令或总动员，影响各方履行本协议的；
      2. 影响各方履行本协议的重大政策变化和行政命令；
      3. 影响各方履行本协议的火灾、水灾、台风、飓风、海啸、滑坡、地震、爆炸、瘟疫或流行病、传染病以及其它自然因素所致的事情；
      4. 国家公安系统的权威数据源受政策原因停止相关服务；
      5. 黑客攻击、计算机病毒侵入或发作；
      6. 计算机系统遭到破坏、瘫痪或无法正常使用导致信息或纪录的丢失；
      7. 电信部门技术调整导致重大影响；
      8. 因政府管制而造成的暂时性关闭等；
      9. 其它不可抗力的情形。
      <p>八、违约责任</p>（一）任一方因违反本协议的约定，给守约方造成损失，违约方应赔偿守约方的损失。
      （二）本平台对您的违约行为可采取以下处理方式：对有关信息或订单进行删除、屏蔽、关闭等；对有关行为进行限制，包括限制权限、中止提供部分或全部服务、查封账户、终止服务等；对您的违约行为或违法信息在平台进行公示等。
      （三）如您的行为使平台、上海麦律及其关联公司遭受损失的（包括自身的直接经济损失、商誉损失及对外支付的赔偿金、律师费、诉讼费等间接经济损失），您应当赔偿上述全部损失。
      （四）如因您的行为使平台、上海麦律及其关联公司被第三方起诉，则平台、上海麦律及其关联公司有权在对第三方承担责任后就全部损失向您进行追偿，因追偿产生的差旅费、律师费、诉讼费、担保费等由您承担。
      <p>九、协议变更或终止</p>（一）由于法律、法规及规范性文件的变化，或者因平台业务发展的需要，平台有权对本协议的条款作出变更或修改，一旦本协议的内容发生任何变更或修改（包括但不限于重要风险提示、平台服务内容变更等），平台将会在手机客户端、其他客户端或网站上公布修改后的协议内容，该公布行为视为平台已全面通知您修改内容。如您不同意变更或修改后的协议内容，注册用户有权立即停止使用平台或平台服务。如您继续使用平台或平台服务的，视为您已接受前述修改内容。
      （二）出现以下情况时，平台有权终止与您的服务协议：
      1.因您违反本协议约定，平台有权依据违约条款终止服务协议的；
      2.因您违反法律规定；
      3.其它平台认为应当终止服务协议的情况。
      本协议终止后，如因您的行为给平台造成损失的，您应进行赔偿。
      本协议终止后，对于在服务终止前发生的交易订单，如平台服务需求者要求继续履行的，您应当继续履行交易订单的约定，并承担因此发生的损失或增加的费用。
      <p>十、适用法律与争议解决</p>（一）本协议的效力、解释、变更、执行与争议解决均适用中华人民共和国法律（不包括香港、澳门与台湾地区），如无相关法律规定的，参照商业惯例或行业惯例。
      （二）因本协议在履行产生的任何争议，均应由上海麦律与您协商处理，协商不成的，任何一方有权向上海市宝山区人民法院提起诉讼。
      <p>十一、其他事项</p>（一）本协议采取网上确认的形式进行签署，当您按照注册页面提示填写信息、阅读并点击同意本协议后，本协议即生效。
      （二）您同意平台通过以下方式向其送达各类通知或文件资料，包括但不限于：网页公告、系统通知、客户端推送消息、向您注册时预留的联系方式发送电子邮件、短信、信函等。
      <p>十二、意见和建议</p>如您有任何意见、建议或疑问均可以致电上海麦律或通过邮箱进行反馈。
      <br />附：
      <a
        href="https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/mailv/%E9%BA%A6%E5%BE%8B%E5%B9%B3%E5%8F%B0%E5%BE%8B%E5%B8%88%E6%9C%8D%E5%8A%A1%E6%89%8B%E5%86%8C.docx"
      >《麦律平台律师服务手册》</a>
      <br />
      <el-radio v-model="hasLook" label="true">我已阅读并同意注册协议、服务手册</el-radio>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import imgSrc from "../../assets/pic/shutterstock_396850561-min.jpg";
import {arrAll} from "./register"
import {
  registerRole,
  registerProfessions,
  register,
  phoneChack
} from "../../api/api";
import { upFile } from "../../api/plupload3";
export default {
  name: "Register",
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      phoneChack({
        mobile: value
      }).then(res => {
        if (res) {
          return callback(new Error("电话号码已被注册"));
        }
      });
      
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    var checkCard = (rule, value, callback) => {
      const phoneReg = /^[0-9]{17}$/;
      if (!value) {
        return callback(new Error("执业证号不能为空"));
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("律师证号格式不正确"));
          }
        }
      }, 100);
    };
    // 中名验证
    const chnName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入中文名"));
      } else {
        const reg = /^[\u4e00-\u9fa5]+$/;
        if (value.length < 100 && reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的中文名"));
        }
      }
    };
    //邮箱检测
    
      // const checkEmail = (rule, value, callback) => {
      //   console.log(rule,value)
        
      //   if (value === '') {
      //     callback(new Error('请正确填写邮箱'));
      //   } else {
      //     if (value !== '') { 
      //       var reg=/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
      //       if(!reg.test(value)){
      //         callback(new Error('请输入有效的邮箱'));
      //       }
      //     }
      //     callback();
      //   }
      // };
    return {
      hasLook: false,
      showClo: false,
      dialogVisible: false,
      imgUrl: imgSrc,
      i: 1,
      role: [],
      firmOption: [],
      pdfName: "1",
      options:[],
      form: {
        // username: "",
        // password: "",
        realName: "",
        lawFiem: "",
        cardNumber: "",
        userPhone: "",
        // mail:"",
        role: "",
        field: [],
        region:[],
        textarea: "",
        pic_1: "1",
        pic_2: "1"
      },
      rules: {
        // username: [
        //   { required: true, message: "请输入用户名", trigger: "blur" },
        //   { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        // ],
        // password: [
        //   { required: true, message: "请输入密码", trigger: "change" },
        //   { min: 6, max: 13, message: "长度在 6 到 13 个字符", trigger: "blur" }
        // ],
        // password: [
        //   { required: true, message: "请输入密码", trigger: "change" },
        //   { min: 6, max: 13, message: "长度在 6 到 13 个字符", trigger: "blur" }
        // ],
        realName: [{ validator: chnName, trigger: "blur" }],
        lawFiem: [
          { required: true, message: "请输入律所名称", trigger: "blur" },
          { min: 2, max: 15, message: "长度在 2 到 15个字符", trigger: "blur" }
        ],
        userPhone: [{ validator: checkPhone, trigger: "blur" }],
        cardNumber: [{ validator: checkCard, trigger: "blur" }],
        region:[{ required: true, message: "请输入主要工作地点", trigger: "blur" }],
        // mail: [{ validator:checkEmail, trigger: 'blur' }],
        role: [
          {
            required: true,
            message: "请至少选择一个角色",
            trigger: "change"
          }
        ],
        field: [
          {
            required: true,
            message: "请至少选择一个选择擅长类别",
            trigger: "change"
          }
        ],
        textarea: [
          { required: true, message: "请填写自我介绍", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    showWindow() {
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.i = 2;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addOss() {
      var dir = "register_upload/head/";
      upFile("up_pic1", "up_father1", dir).then(res => {
        console.log(res, "注册");
        this.form.pic_1 =
          "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
          res[0].nowName;
        this.addOss();
      });
    },
    addOss2() {
      var dir2 = "register_upload/data/";
      upFile("up_pic2", "up_father2", dir2).then(res => {
        console.log(res);
        this.form.pic_2 =
          "https://cloudcore-oss.oss-cn-hangzhou.aliyuncs.com/" +
          res[0].nowName;
        if (res[0].nowName.includes(".pdf") | res[0].nowName.includes(".PDF")) {
          this.pdfName = res[0].lastName;
        } else {
          this.pdfName = "1";
        }
        console.log(this.pdfName);
        this.addOss2();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.i = 2;
          setTimeout(this.addOss, 1000);
          setTimeout(this.addOss2, 1000);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     handleChange(value) {
        console.log(this.form.region);
        
      },
    submitForm2(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.hasLook == false) {
            window.alert("请先阅读完注册协议,并勾选已阅读");
          } else {
            register({
              lawyerName: this.form.realName,
              lawyerFirm: this.form.lawFiem, //律师律所
              lawyerCertNo: this.form.cardNumber, //执业证号
              lawyerMobile: this.form.userPhone, //手机号
              lawyerRole: this.form.role, //律师角色
              // lawyerEmail:this.form.mail,
              lawyerProfession: this.form.field.join(), //擅长领域
              lawyerImageUrl: this.form.pic_1, //律师头像地址
              lawyerExtend: this.form.textarea, //律师个人简介
              lawyerInfoUrl: this.form.pic_2 ,//律师职业信息地址
              // lawyerYearUrl;//律师年检盖章地址
              lawyerProvince:this.form.region[0],
              lawyerCity:this.form.region[1],
              lawyerAddress:this.form.region[2],
            }).then(res => {
              console.log(res);
              if (res.status == true) {
                window.alert("已提交，审核通过后会有短信提醒");
                this.$router.push({
                  path: "/login"
                });
              } else {
                window.alert(res.msg);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  mounted() {
    registerRole().then(res => {
      this.role = res;
    });
    registerProfessions().then(res => {
      this.firmOption = res;
    });
   
    
    this.options=arrAll
    
  }
};
</script>

<style >
.register {
  background-color: rgb(131, 128, 128);
  height: 100%;
  /* width: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.bgc {
  width: 100%;
  min-width:1100px;
  height: 100%;
  position: absolute;
  background: url(../../assets/pic/shutterstock_396850561-min.jpg);
  background-size: 100% 100%;
  -webkit-filter: blur(15px);
  -moz-filter: blur(15px);
  -o-filter: blur(15px);
  -ms-filter: blur(15px);
  filter: blur(15px);
}

a {
  color: rgb(100, 158, 253);
  text-decoration: none;
}
.register .register_box {
  height: 72rem;
  width: 1027px;
  min-width:1027px;
  background: rgba(255, 255, 255, 1);
  border-radius: 16px;
  box-sizing: border-box;
  padding: 0%;
  display: flex;
  z-index: 1000;
}
.register .box_left {
  width: 42%;
  position: relative;
  display: flex;
  align-items: center;
}
.register .pic_title {
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 1);
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.register .box_right {
  width: 58%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.register .el-input {
  width: 37.1rem;
  height: 4.8rem;
}
.register .el-form-item__content {
  display: flex;
  justify-content: center;
}

.register .el-input__inner {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.register .box1-radios-box {
  width: 37.1rem;
}
.register .el-radio--mini.is-bordered {
  margin-left: 0;
  margin-bottom: 10px;
}
.el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 0;
}
.next_buttom {
  width: 62.5%;
  height: 7.8%;
  background: rgba(64, 126, 112, 1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 29px;
  margin-top: 1rem;
}

.register .agreement_box {
  width: 100%;
  display: flex;
  padding: 0 25px 0 25px;
  justify-content: space-between;

  box-sizing: border-box;
  margin-top: 4rem;
}
.register .agree_text {
  display: block;
  font-size: 1.6rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #cccccc;
  line-height: 29px;
}
.register .register_box2 {
  height: 69.3rem;
  width: 1027px;
  min-width: 1027px;
  background: rgba(255, 255, 255, 1);
  border-radius: 16px;
  box-sizing: border-box;
  padding: 0%;
  display: flex;
  z-index: 1000;
}
.register .register_box2 .box_left {
  width: 42%;
}

.register .register_box2 .box_right {
  width: 58%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: red; */
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0px;
}
.register .register_box2 .el-form-item__error {
  left: 17.5%;
}
/* .register .register_box2 .radio_box {
  width: 70%;
}

.register .register_box2 .el-form-item {
  margin-bottom: 1.5rem;
  margin-top: 0%;
}

.register .register_box2 .el-radio__label {
  font-size: 1.2rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
} */
/* .register .register_box2 .el-radio-group {
  display: flex;
  flex-wrap: wrap;
}
.register .register_box2 .el-radio--mini.is-bordered {
  margin: 0.5rem 0.5rem 0.5rem 0.5rem;
}
.register .register_box2 .el-form-item__error {
  margin-left: 15%;
} */

.register .register_box2 .title_text {
  font-size: 1.6rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
}
.register .register_box2 .add_pic {
  height: 7em;
  width: 7em;
  border-radius: 5px;
  border: 1px rgb(174, 174, 174) dashed;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register .register_box2 .next_buttom {
  width: 62.5%;
  height: 7.8%;
  background: rgba(64, 126, 112, 1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 29px;
  margin-top: 2rem;
}

.register .register_box2 .agreement_box {
  width: 100%;
  display: flex;
  padding: 0 25px 0 25px;
  justify-content: space-between;

  box-sizing: border-box;
  margin-top: 4rem;
}
.register .register_box2 .agree_text {
  display: block;
  font-size: 1.6rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #cccccc;
  line-height: 29px;
}
</style>