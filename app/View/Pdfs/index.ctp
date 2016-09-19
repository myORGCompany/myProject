<?php
$this->pdf->core->addPage('', 'USLETTER');
$this->pdf->core->setFont('helvetica', '', 12);
// $this->pdf->core->cell(30, 0, 'Hello World');
// $this->pdf->core->Output('example_001.pdf', 'D');
$this->pdf->core->writeHTML($this->element('registration'), true, 0, true, 0);

$this->pdf->core->lastPage();
$this->pdf->core->Output('example_049.pdf', 'D');
?>