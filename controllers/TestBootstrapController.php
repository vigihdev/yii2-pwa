<?php


namespace app\controllers;

use app\models\test\bootstrap\Alert;
use app\models\test\bootstrap\Badge;
use app\models\test\bootstrap\Chip;
use Yii;
use app\models\test\bootstrap\Button;
use app\models\test\bootstrap\ButtonGroup;
use app\models\test\bootstrap\Card;
use app\models\test\bootstrap\Carousel;
use app\models\test\bootstrap\Checkbox;
use app\models\test\bootstrap\Collapse;
use app\models\test\bootstrap\Color;
use app\models\test\bootstrap\components\Rating;
use app\models\test\bootstrap\FloatingActionButton;
use app\models\test\bootstrap\Form;
use app\models\test\bootstrap\Lists;
use app\models\test\bootstrap\MaterialIcons;
use app\models\test\bootstrap\Pagination;
use app\models\test\bootstrap\RadioButton;
use app\models\test\bootstrap\Shadow;
use app\models\test\bootstrap\Spinner;
use app\models\test\bootstrap\TextFields;
use app\models\test\bootstrap\Typography;
use app\models\test\bootstrap\Modal;
use app\models\test\bootstrap\ModalContent;
use app\models\test\bootstrap\Navbar;
use app\models\test\bootstrap\Navs;
use app\models\test\bootstrap\uiSection\FooterSection;
use app\models\test\bootstrap\uiSection\IntroSection;
use app\models\test\bootstrap\uiSection\LoginSection;
use app\models\test\bootstrap\uiSection\RequestPasswordSection;
use app\models\test\bootstrap\uiSection\SignupSection;
use app\models\test\bootstrap\uiSection\UserProfileSection;

class TestBootstrapController extends \yii\web\Controller
{
    public $layout = 'test-bootstrap';

    public function init()
    {
        parent::init();
        $this->setViewPath('@app/views/test/bootstrap');
    }

    public function actionIndex()
    {      
        return $this->render('index');
    }

    public function actionTypography()
    {      
        $model = new Typography();
        return $this->render('typography',['model' => $model]);
    }

    public function actionCard()
    {      
        $model = new Card();
        return $this->render('card',['model' => $model]);
    }

    public function actionCheckbox()
    {
        $model = new Checkbox();
        return $this->render('checkbox',['model' => $model]);
    }

    public function actionButton()
    {
        $model = new Button();
        return $this->render('button',['model' => $model]);        
    }

    public function actionBadge()
    {
        $model = new Badge();
        return $this->render('badge',['model' => $model]);             
    }

    public function actionAlert()
    {
        $model = new Alert();
        return $this->render('alert',['model' => $model]);          
    }

    public function actionChip()
    {
        $model = new Chip();
        return $this->render('chip',['model' => $model]);        
    }

    public function actionMaterialIcons()
    {
        $model = new MaterialIcons();
        return $this->render('material-icons',['model' => $model]);        
    }

    public function actionForm()
    {
        $model = new Form();
        return $this->render('form',['model' => $model]);           
    }

    public function actionRadioButton()
    {
        $model = new RadioButton();
        return $this->render('radio-button',['model' => $model]);   
    }

    public function actionTextFields()
    {
        $model = new TextFields();
        return $this->render('text-fields',['model' => $model]);        
    }

    public function actionInputGroup()
    {
         
    }

    public function actionLists()
    {
        $model = new Lists();
        return $this->render('lists',['model' => $model]); 
    }

    public function actionShadow()
    {
        $model = new Shadow();
        return $this->render('shadow',['model' => $model]); 
    }

    public function actionColor()
    {
        $model = new Color();
        return $this->render('color',['model' => $model]); 
    }

    public function actionSpinner()
    {
        $model = new Spinner();
        return $this->render('spinner',['model' => $model]);        
    }

    public function actionAlerts(){}
    public function actionButtons(){}

    public function actionButtonGroup()
    {
        $model = new ButtonGroup();
        return $this->render('button-group',['model' => $model]);  
    }

    public function actionFloatingActionButton()
    {
        $model = new FloatingActionButton();
        return $this->render('floating-action-button',['model' => $model]);         
    }

    public function actionPagination()
    {
        $model = new Pagination();
        return $this->render('pagination',['model' => $model]);         
    }

    public function actionModal()
    {
        $model = new Modal();
        return $this->render('modal',['model' => $model]);          
    }

    public function actionModalContent()
    {
        $model = new ModalContent();
        return $this->renderAjax('modal-content',['model' => $model]);          
    }

    public function actionCarousel()
    {
        $model = new Carousel();
        return $this->render('carousel',['model' => $model]);  
    }

    public function actionForms(){}

    public function actionCollapse()
    {
        $model = new Collapse();
        return $this->render('collapse',['model' => $model]);         
    }

    public function actionNavs()
    {
        $model = new Navs();
        return $this->render('navs',['model' => $model]);           
    }

    public function actionNavbar()
    {
        $model = new Navbar();
        return $this->render('navbar',['model' => $model]);   
    }

    public function actionDropdowns(){}
    public function actionJumbotron(){}
    public function actionListGroup(){}
    public function actionMediaObject(){}
    public function actionPopovers(){}
    public function actionProgress(){}
    public function actionScrollspy(){}
    public function actionSpinners(){}
    public function actionToasts(){}
    public function actionTooltips(){}

    public function actionAccordion(){}
    public function actionDropdown(){}
    public function actionStepper(){}
    public function actionFileInput(){}
    public function actionPopover(){}
    public function actionTab(){}
    public function actionProgressbar(){}
    public function actionTable(){}
    public function actionBreadcrumb(){}
    public function actionSelect(){}
    public function actionThemesBootstrap(){}
    public function actionSidebar(){}
    public function actionToggleSwitch(){}
    public function actionSlider(){}
    public function actionTooltip(){}

    /** @var Block Component */
    public function actionDataTable(){}
    public function actionDatetimepicker(){}
    public function actionRangeSlider(){}
    public function actionSelect2(){}
    
    public function actionRating()
    {
        $model = new Rating();
        return $this->render('components/rating',['model' => $model]); 
    }
    /** @var End Block Component */

    /** @var End Block UI Sections */
    public function actionIntroSection()
    {
        $model = new IntroSection();
        return $this->render('ui-section/intro-section',['model' => $model]); 
    }

    public function actionFooterSection()
    {
        $model = new FooterSection();
        return $this->render('ui-section/footer-section',['model' => $model]); 
    }

    public function actionContactSection(){}

    public function actionUserProfileSection()
    {
        $model = new UserProfileSection();
        return $this->render('ui-section/user-profile-section',['model' => $model]); 
    }

    public function actionLoginSection()
    {
        $model = new LoginSection();
        return $this->render('ui-section/login-section',['model' => $model]); 
    }

    public function actionSignupSection()
    {
        $model = new SignupSection();
        return $this->render('ui-section/signup-section',['model' => $model]); 
    }

    public function actionRequestPasswordSection()
    {
        $model = new RequestPasswordSection();
        return $this->render('ui-section/request-password-section',['model' => $model]); 
    }
    /** @var End Block UI Sections */

}

