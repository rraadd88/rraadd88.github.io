.. _example:

==========================================
Example Datasets
==========================================

Following are few examples of execution and outputs from analysis of datasets.

1. Olson_et_al_2014_ (GB1)
This dataset contains frequencies of single site mutants obtained by DMS of GB1 protein based of their binding affinity to the partner.

2. Firnberg_et_al_2014_ (TEM1).
This dataset contains frequencies of single site codon level mutants obtained by DMS of E. coli TEM-1 beta-lactamase in Ampicilin at 256 ug/ml (Amp256) and (Amp0.5). 

3. Melnikov_et_al_2014_ (APH2)
This dataset contains frequencies of single site mutants obtained by DMS of E. coli aminoglycoside-3 -phosphotransferase-II (APH(3')II) mutants selected for resistance against Kanamicin at 1:4 MIC of wild type (sample KKA2_S1_Kan14_L1) and at 1:1 MIC of wild type (sample KKA2_S1_Kan11_L1). 


Download and analyze datasets
=============================

Exaple datasets are hosted at https://github.com/rraadd88/ms_datasets . 
In the downloaded folder `ms_dataset`, directory `analysis` is to be used to analyze different datasets as follows. 
Note that to download the repository, one would need `git` installed on the machine. On Debian or Ubuntu Linux, `git` can be installed by this command: `sudo apt-get install git && sudo apt-get update`.

.. code-block:: text

    git clone https://github.com/rraadd88/ms_datasets.git
    cd ms_dataset/analysis
    dms2dfe <project directory>

Here, '<project directory>' can be `Firnberg_et_al_2014`, `Melnikov_et_al_2014` or `Olson_et_al_2014`

Note: dataset `Melnikov_et_al_2014` would need sequencing data to be dowloaded from SRA. A script named `get_seq_data.py` (located at `ms_datasets/analysis`) would download the `fastq` files (~300Mb) in `Melnikov_et_al_2014/data_input` folder. 

.. code-block:: text

    get_seq_data.py Melnikov_et_al_2014

Outputs
=======

The outputs of the run can be vaidated with those kept in 'ms_datasets/outputs'.


Citations
=========

.. [Firnberg_et_al_2014] Firnberg, E., J.W. Labonte, J.J. Gray, and M. Ostermeier. 2014. A comprehensive, high-resolution map of a Gene’s fitness landscape. Molecular Biology and Evolution. 31: 1581–1592.

.. [Olson_et_al_2014] Olson, C. Anders, Nicholas C. Wu, and Ren Sun. 2014. “A Comprehensive Biophysical Description of Pairwise Epistasis throughout an Entire Protein Domain.” Current Biology 24 (22): 2643–2651. doi:10.1016/j.cub.2014.09.072. http://dx.doi.org/10.1016/j.cub.2014.09.072.

.. [Melnikov_et_al_2014] Melnikov, A., P. Rogov, L. Wang, A. Gnirke, and T.S. Mikkelsen. 2014. Comprehensive mutational scanning of a kinase in vivo reveals substrate-dependent fitness landscapes. Nucleic Acids Research. 42: 1–8.