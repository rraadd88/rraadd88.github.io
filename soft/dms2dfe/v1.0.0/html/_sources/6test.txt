.. _example:

==========================================
Example Datasets
==========================================

Following are few examples of execution and outputs from analysis of datasets.

1. Firnberg_et_al_2014_ (TEM1).
This dataset contains frequencies of single site mutants obtained by DMS of E. coli TEM-1 beta-lactamase in Ampicilin at 256 ug/ml (Amp256) and (Amp0.5). 

2. Melnikov_et_al_2014_ (APH2)
This dataset contains frequencies of single site mutants obtained by DMS of E. coli aminoglycoside-3 -phosphotransferase-II (APH(3')II) mutants selected for resistance against Kanamicin at 1:4 MIC of wild type (sample KKA2_S1_Kan14_L1) and at 1:1 MIC of wild type (sample KKA2_S1_Kan11_L1). 

3. Olson_et_al_2014_ (GB1)
This dataset contains frequencies of single site mutants obtained by DMS of GB1 protein based of their binding affinity to the partner.

Downloading datasets
====================

Exaple datasets can be downloaded from the latest release from https://github.com/rraadd88/ms_datasets/releases .
In the folder `ms_dataset`, directory `outputs` contains pre-analysed outputs for validation of run while directory `analysis` can be used to test/analyze different datasets as follows. 

Run dms2dfe
===========

.. code-block:: text

	cd ms_dataset/analysis
	dms2dfe <project directory>

Here, '<project directory>' can be `Firnberg_et_al_2014`, `Melnikov_et_al_2014` or `Olson_et_al_2014`

Outputs
=======

The outputs of the run can be vaidated with those kept in 'ms_datasets/outputs'.

Citations
---------

.. [Melnikov_et_al_2014] Melnikov, A., P. Rogov, L. Wang, A. Gnirke, and T.S. Mikkelsen. 2014. Comprehensive mutational scanning of a kinase in vivo reveals substrate-dependent fitness landscapes. Nucleic Acids Research. 42: 1–8.

.. [Firnberg_et_al_2014] Firnberg, E., J.W. Labonte, J.J. Gray, and M. Ostermeier. 2014. A comprehensive, high-resolution map of a Gene’s fitness landscape. Molecular Biology and Evolution. 31: 1581–1592.

.. [Olson_et_al_2014] Olson, C. Anders, Nicholas C. Wu, and Ren Sun. 2014. “A Comprehensive Biophysical Description of Pairwise Epistasis throughout an Entire Protein Domain.” Current Biology 24 (22): 2643–2651. doi:10.1016/j.cub.2014.09.072. http://dx.doi.org/10.1016/j.cub.2014.09.072.


