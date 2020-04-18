<?php

namespace rs\navigationbar\Application\Model;

class Category extends Category_parent
{
    protected $_rs_navigationbar_iCount=0;
    protected $_rs_navigationbar_aLinks=[];
    protected $_rs_navigationbar_aLinksCols=[];

    public function rs_navigationbar_generateSub($oViewConf, $homeSelected)
    {
        $this->_rs_navigationbar_iCount = 0;
        $this->_rs_navigationbar_aLinks = [];
        $this->_rs_navigationbar_aLinksCols=[];

        foreach($this->getSubCats() as $subcatkey => $osubcat)
        {
            if($osubcat->getIsVisible())
            {
                foreach($osubcat->getContentCats() as $ocont)
                {
                    $this->_rs_navigationbar_iCount++;
                    $this->_rs_navigationbar_aLinks[] = '<a class="'.($oViewConf->getContentId() == $ocont->getId()?'selected':'').'" href="'.$ocont->getLink().'">'.$ocont->oxcontents__oxtitle->value.'</a>';
                }
                $this->_rs_navigationbar_iCount++;
                $this->_rs_navigationbar_aLinks[]='<a class="'.($homeSelected == false && $osubcat->expanded?'selected':'').'" href="'.$osubcat->getLink().'">'.$osubcat->oxcategories__oxtitle->value.'</a>';
            }
        }

        if($this->_rs_navigationbar_iCount>0)
        {
            $iCol = $this->_rs_navigationbar_columnCountLarge();
            $this->_rs_navigationbar_aLinksCols = array_chunk($this->_rs_navigationbar_aLinks,  ceil($this->_rs_navigationbar_iCount / $iCol));
        }
    }

    protected function _rs_navigationbar_columnCountLarge()
    {
        $iCol = (int) $this->getConfig()->getConfigParam('rs-navigationbar_main__standard_sub_column_count_large');
        if($iCol===0) $iCol=1;
        return $iCol;
    }

    protected function _rs_navigationbar_columnCountMedium()
    {
        $iCol = (int) $this->getConfig()->getConfigParam('rs-navigationbar_main__standard_sub_column_count_medium');
        if($iCol===0) $iCol=1;
        return $iCol;
    }

    public function rs_navigationbar_columnWidthLarge()
    {
        return 12 / $this->_rs_navigationbar_columnCountLarge();
    }

    public function rs_navigationbar_columnWidthMedium()
    {
        return 12 / $this->_rs_navigationbar_columnCountMedium();
    }

    public function rs_navigationbar_hasSubCount()
    {
        if($this->_rs_navigationbar_iCount>0)
            return true;
        return false;
    }
    public function rs_navigationbar_getSubColumns()
    {
        return $this->_rs_navigationbar_aLinksCols;
    }

}
