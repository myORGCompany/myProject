
<body>	

<div class="container">
	<div class="row navbar-collapse collapse well" >
        <ul class="nav nav-tabs">
          <li class="margin-bottom-10" ><a href="<?php echo ABSOLUTE_URL;?>/deshBoard" >HOME</a></li>
          <li class="margin-bottom-10" role="presentation"><a class="text-info" href="<?php echo ABSOLUTE_URL;?>/products">PRODUCTS</a></li>
          <li class="margin-bottom-10" role="presentation"><a class="text-info" href="<?php echo ABSOLUTE_URL;?>/salse">SALSE</a></li>
          <li class="margin-bottom-10" role="presentation"><a class="text-info" href="<?php echo ABSOLUTE_URL;?>/bulkSalse">BULK SALSE</a></li>
          <li class="margin-bottom-10" role="presentation"><a class="text-info" href="<?php echo ABSOLUTE_URL;?>/ManageProducts"">MANAGE DATA</a></li>
          <li class="margin-bottom-10" role="presentation"><a class="text-info" href="<?php echo ABSOLUTE_URL;?>/viewList"">VIEW ALL</a></li>
        </ul>
    </div>
    
</div>

<div class="container">
	<div class="col-md-12 well ">
        <div class="">
          	<?php echo $this->element('card-expairy'); ?>
        </div>
    </div>
</div>
<style type="text/css">
  .border-radius{
    border-radius:15px 50px !important;
  }
  .m-l-3{
    margin-left: 3%;
  }
  .m-l-6{
    margin-left: 6%;
  }
  .m-r-6{
    margin-right: 6%;
  }
  .m-r-10{
    margin-right: 10%;
  }
  .m-r-20{
    margin-right: 20%;
  }
  .m-b-3{
    margin-bottom: 3%;
  }
  .m-b-6{
    margin-bottom: 6%;
  }
</style>
</body>


<style type="text/css">
	
	#inner-headline {
    background: #e7e7e7 url("<?php echo ABSOLUTE_URL;?>/img/border-bg.jpg") repeat-x scroll left top;
    border-bottom: 1px solid #cbcbcb;
    color: #358a22;
    height: 70px;
    margin: 0 0 25px;
    width: 90%;
    padding: 12px 0;
    position: relative;
}
.padding-0{
    padding: 0px 0px 0px;
}
.m-r-r-10{
  margin-right: 10px !important;
}
.m-r-l-10{
    margin-left: 10px !important;
}

.margin-bottom-10{
  margin-bottom: 10px!important;
}
.padding-top-10{
   margin-top: 20px;
}
.btn-footer{
    border-top: 0px solid #e5e5e5;
    margin-top: 0px;
    padding: 0px 2px 0px;
    text-align: center;
}
.remove-border{
  border-bottom: 0px solid #e5e5e5;
}
.cardType{
    box-shadow: 0 3px 5px #c9c9c9;
    border-radius: 20px !important;
}
.cards{
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 7px !important;
    display: block;
    margin-bottom: 0.75rem;
    position: relative;
}
.c-table{
    max-width: 97%;
    padding: 10px!important;
    margin-left: 4px!important;
}
</style>