<?php


namespace app\controllers;

use app\models\test\bootstrap\Alert;
use app\models\test\bootstrap\Badge;
use app\models\test\bootstrap\Chip;
use Yii;
use app\models\test\bootstrap\Button;
use app\models\test\bootstrap\Card;
use app\models\test\bootstrap\Checkbox;
use app\models\test\bootstrap\Form;
use app\models\test\bootstrap\Lists;
use app\models\test\bootstrap\MaterialIcons;
use app\models\test\bootstrap\RadioButton;
use app\models\test\bootstrap\TextFields;
use app\models\test\bootstrap\Typography;

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

    public function actionInputGroup(){}

    public function actionLists()
    {
        $model = new Lists();
        return $this->render('lists',['model' => $model]); 
    }

    public function actionAccordion(){}
    public function actionDropdown(){}
    public function actionPagination(){}
    public function actionStepper(){}
    public function actionFileInput(){}
    public function actionPopover(){}
    public function actionTab(){}
    public function actionFloatingActionButton(){}
    public function actionProgressbar(){}
    public function actionTable(){}
    public function actionBreadcrumb(){}
    public function actionSelect(){}
    public function actionThemesBootstrap(){}
    public function actionSidebar(){}
    public function actionToggleSwitch(){}
    public function actionModal(){}
    public function actionSlider(){}
    public function actionTooltip(){}
    public function actionNavbar(){}
    public function actionSpinner(){}
}
