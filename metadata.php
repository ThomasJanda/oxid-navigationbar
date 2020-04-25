<?php

$sMetadataVersion = '2.0';

$aModule = array(
    'id'               => 'rs-navigationbar',
    'title'            => '*RS Navigation bar',
    'description'      => '',
    'thumbnail'        => '',
    'version'          => '1.0.0',
    'author'           => '',
    'url'              => '',
    'email'            => '',
    'extend'           => array(
        \OxidEsales\Eshop\Application\Model\Category::class => rs\navigationbar\Application\Model\Category::class,
    ),
    'templates' => array(
        'rs/navigationbar/views/tpl/widget/header/categorylist.tpl'     => 'rs/navigationbar/views/tpl/widget/header/categorylist.tpl',
    ),
    'blocks'      => array(
        array(
            'template' => 'widget/header/categorylist.tpl',
            'block'    => 'dd_widget_header_categorylist',
            'file'     => '/views/block/widget/header/categorylist__dd_widget_header_categorylist.tpl',
        ),
        array(
            'template' => 'layout/page.tpl',
            'block'    => 'layout_header',
            'file'     => '/views/block/layout/page__layout_header.tpl',
        ),
    ),
    'settings' => array(
        array(
            'group' => 'rs-navigationbar_main',
            'name' => 'rs-navigationbar_main__display_homelink',
            'type' => 'bool',
            'value' => true
        ),
        array(
            'group' => 'rs-navigationbar_main',
            'name' => 'rs-navigationbar_main__standard_sub_column_count_large',
            'type' => 'select',
            'value' => '4',
            'position' => 2,
            'constraints' => '2|3|4|6'
        ),
        array(
            'group' => 'rs-navigationbar_main',
            'name' => 'rs-navigationbar_main__standard_sub_column_count_medium',
            'type' => 'select',
            'value' => '3',
            'position' => 1,
            'constraints' => '2|3|4|6'
        ),
        array(
            'group' => 'rs-navigationbar_main',
            'name' => 'rs-navigationbar_main__theme',
            'type' => 'str',
            'value' => 'oxid-6-wave',
        ),
        array(
            'group' => 'rs-navigationbar_main',
            'name' => 'rs-navigationbar_main__display_snippet_id_in_the_shop',
            'type' => 'bool',
            'value' => false,
        ),
    )
);
