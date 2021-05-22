.. _example:

==========================================
Example
==========================================

Following are few example datasets included in the `dms2dfe` package (located at 'dms2dfe/test_dataset').

TEM1_Firnberg_et_al_2014 (TEM1) dataset is analyzed from 'publication data'.

APH2_Melnikov_et_al_2014 (APH2) dataset is analyzed from 'sequencing data' downloaded from SRA or alternatively, this dataset can be analyzed from 'publication data'. 

These options are provided in the `get_test_dataset.py` script located in 'dms2dfe/test_dataset'.


TEM-1 beta-lactamase (TEM1)
===========================
We used a dataset from Firnberg_ et. al., where DMS of E. coli TEM-1 beta-lactamase, an ampicilin resistant gene was carried out. Here we use a subset of data in which mutants were selected for resistance against Ampicilin at 256 ug/ml (Amp256) and (Amp0.5). 
In this analysis we start from frequencies of amino acid mutants and estimate fitness. 

Downloading dataset
-------------------

The dataset for this example can be downloaded by a python script `get_test_dataset.py` located in `dms2dfe/test_dataset`.

.. code-block:: text

    cd dms2dfe/test_dataset
    python get_test_dataset.py

Here the project directory is `TEM1_Firnberg_et_al_2014`.

Run dms2dfe
-----------

To run `dms2dfe` on the dataset simply fire following command though bash,

.. code-block:: text

    python path/to/dms2dfe/pipeline.py TEM1_Firnberg_et_al_2014

Outputs
-------

With a successful run of `dms2dfe`, output visualizations for sample `Amp256` should look like following.

# Frequencies of mutants in the unselected (Amp256) pool
  data: test_dataset/TEM1_Firnberg_et_al_2014/data_lbl/aas/Amp256

.. image:: _static//TEM1_Firnberg_et_al_2014/plots/aas/fig_heatmap_Amp256.png
   :name: 

# Mutation matrix of preferential enrichments
  data: test_dataset/TEM1_Firnberg_et_al_2014/data_fit/aas/Amp256_WRT_Amp0.5

.. image:: _static//TEM1_Firnberg_et_al_2014/plots/aas/fig_heatmap_Amp256_WRT_Amp0.5.png
   :name: 

# Mutation matrix of fitness scores
  data: test_dataset/TEM1_Firnberg_et_al_2014/data_fit/aas/Amp256_WRT_Amp0.5_inferred

.. image:: _static//TEM1_Firnberg_et_al_2014/plots/aas/fig_heatmap_Amp256_WRT_Amp0.5_inferred.png
   :name: 

# Distribution of fitness
  data: test_dataset/TEM1_Firnberg_et_al_2014/data_fit/aas/Amp256_WRT_Amp0.5_inferred

.. image:: _static//TEM1_Firnberg_et_al_2014/plots/aas/fig_dfe_Amp256_WRT_Amp0.5_inferred.png
   :name: 

# Substitution matrix based on Fitness values
  data: test_dataset/TEM1_Firnberg_et_al_2014/data_fit/aas/Amp256_WRT_Amp0.5_inferred

.. image:: _static//TEM1_Firnberg_et_al_2014/plots/aas/fig_sub_matrix_Amp256_WRT_Amp0.5_inferred.png
   :name: 

# Fitness values projected on PDB structure
  data: test_dataset/TEM1_Firnberg_et_al_2014/data_fit/aas/Amp256_WRT_Amp0.5_inferred

.. image:: _static//TEM1_Firnberg_et_al_2014/plots/aas/fig_pdb_Amp256_WRT_Amp0.5_inferred.png
   :name: 

# ROC curve of random forest classification model
  data: test_dataset/TEM1_Firnberg_et_al_2014/data_ml/aas/data_ml_regress_all_data_fit_aas_Amp256_WRT_Amp0.5

.. image:: _static//TEM1_Firnberg_et_al_2014/plots/aas/fig_ml_classi1_roc_data_fit_aas_Amp256_WRT_Amp0.5.png.png
   :name: 

Input configurations
--------------------

Following configurations (located in `TEM1_Firnberg_et_al_2014/cfg`) were used for analysis.

.. csv-table:: `TEM1_Firnberg_et_al_2014/cfg/info`
   :file: _static/TEM1_Firnberg_et_al_2014/cfg/info
   :header-rows: 1
   :stub-columns: 1

.. csv-table:: `TEM1_Firnberg_et_al_2014/cfg/lbls`
   :file: _static/TEM1_Firnberg_et_al_2014/cfg/lbls
   :header-rows: 1
   :stub-columns: 1

.. csv-table:: `TEM1_Firnberg_et_al_2014/cfg/fit`
   :file: _static/TEM1_Firnberg_et_al_2014/cfg/fit
   :header-rows: 1
   :stub-columns: 1

.. csv-table:: `TEM1_Firnberg_et_al_2014/cfg/feats`
   :file: _static/TEM1_Firnberg_et_al_2014/cfg/feats
   :header-rows: 1
   :stub-columns: 1


Aminoglycoside-3 -phosphotransferase (APH2) from 'publication data'
===================================================================

We used a dataset from Melnikov_ et. al., where DMS of aminoglycoside-3 -phosphotransferase-II (APH(3')II), an aminoglycosde resistant gene was carried out. Here we use a subset of data in which mutants is selected for resistance against Kanamicin at 1:4 MIC of wild type (sample KKA2_S1_Kan14_L1). The background library (sample KKA2_Bkg1).
In this analysis we start from frequencies of the mutants (`publication data`). 

Downloading dataset
-------------------

The dataset for this example can be downloaded by a python script `get_test_dataset.py` located in `dms2dfe/test_dataset`.

.. code-block:: text

    cd dms2dfe/test_dataset
    python get_test_dataset.py

Here the project directory is `APH2_Melnikov_et_al_2014`.

Run dms2dfe
-----------

To run `dms2dfe` on the dataset simply fire following command though bash,

.. code-block:: text

    python path/to/dms2dfe/pipeline.py APH2_Melnikov_et_al_2014

Outputs
-------

With a successful run of `dms2dfe`, output visualizations for sample `KKA2_S1_Kan14_L1` should look like following.

# Frequencies of mutants in the unselected (KKA2_Bkg1) pool
  data: test_dataset/APH2_Melnikov_et_al_2014/data_lbl/aas/KKA2_Bkg1

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_heatmap_KKA2_Bkg1.png
   :name: 

# Frequencies of mutants in the unselected (KKA2_S1_Kan14_L1) pool
  data: test_dataset/APH2_Melnikov_et_al_2014/data_lbl/aas/KKA2_S1_Kan14_L1

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_heatmap_KKA2_S1_Kan14_L1.png
   :name: 

# Mutation matrix of fitness scores
  data: test_dataset/APH2_Melnikov_et_al_2014/data_fit/aas/KKA2_S1_Kan14_L1_WRT_KKA2_Bkg1_inferred

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_heatmap_KKA2_S1_Kan14_L1_WRT_KKA2_Bkg1_inferred.png
   :name: 

# Distribution of fitness
  data: test_dataset/APH2_Melnikov_et_al_2014/data_fit/aas/KKA2_S1_Kan14_L1_WRT_KKA2_Bkg1_inferred

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_dfe_KKA2_S1_Kan14_L1_WRT_KKA2_Bkg1_inferred.png
   :name: 

# Substitution matrix based on Fitness values
  data: test_dataset/APH2_Melnikov_et_al_2014/data_fit/aas/KKA2_S1_Kan14_L1_WRT_KKA2_Bkg1_inferred

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_sub_matrix_KKA2_S1_Kan14_L1_WRT_KKA2_Bkg1_inferred.png
   :name: 

# Fitness values projected on PDB structure
  data: test_dataset/APH2_Melnikov_et_al_2014/data_fit/aas/KKA2_S1_Kan14_L1_WRT_KKA2_Bkg1_inferred

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_pdb_KKA2_S1_Kan14_L1_WRT_KKA2_Bkg1_inferred.png
   :name: 

# ROC curve of random forest classification model
  data: test_dataset/APH2_Melnikov_et_al_2014/data_ml/aas/data_ml_regress_all_data_fit_aas_KKA2_S1_Kan14_L1_WRT_KKA2_Bkg1

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_ml_classi1_roc_data_fit_aas_KKA2_S1_Kan14_L1_WRT_KKA2_Bkg1.png.png
   :name: 

Input configurations
--------------------

Following configurations (located in `APH2_Melnikov_et_al_2014/cfg`) were used for analysis.

.. csv-table:: `APH2_Melnikov_et_al_2014/cfg/info`
   :file: _static/APH2_Melnikov_et_al_2014/cfg/info
   :header-rows: 1
   :stub-columns: 1

.. csv-table:: `APH2_Melnikov_et_al_2014/cfg/lbls`
   :file: _static/APH2_Melnikov_et_al_2014/cfg/lbls
   :header-rows: 1
   :stub-columns: 1

.. csv-table:: `APH2_Melnikov_et_al_2014/cfg/fit`
   :file: _static/APH2_Melnikov_et_al_2014/cfg/fit
   :header-rows: 1
   :stub-columns: 1

.. csv-table:: `APH2_Melnikov_et_al_2014/cfg/feats`
   :file: _static/APH2_Melnikov_et_al_2014/cfg/feats
   :header-rows: 1
   :stub-columns: 1

Aminoglycoside-3 -phosphotransferase (APH2) from 'sequencing data'
===================================================================

We used a dataset from Melnikov_ et. al., where DMS of aminoglycoside-3 -phosphotransferase-II (APH(3')II), an aminoglycosde resistant gene was carried out. Here we use a subset of data in which mutants were selected for resistance against Kanamicin at 1:4 MIC of wild type (sample KKA2_S1_Kan14_L1) and at 1:1 MIC of wild type (sample KKA2_S1_Kan11_L1).
In this analysis we start from unaligned .fastq files (`sequencing data`) and ultimately compare fitness of mutants in two selections. 

Downloading dataset
-------------------

The dataset for this example can be downloaded by a python script `get_test_dataset.py` located in `dms2dfe/test_dataset`.

.. code-block:: text

    cd dms2dfe/test_dataset
    python get_test_dataset.py

Here the project directory is `APH2_Melnikov_et_al_2014`.

Run dms2dfe
-----------

To run `dms2dfe` on the dataset simply fire following command though bash,

.. code-block:: text

    python path/to/dms2dfe/pipeline.py APH2_Melnikov_et_al_2014

Outputs
-------

With a successful run of `dms2dfe`, output visualizations for sample `KKA2_S1_Kan14_L1` should look like following.

# Frequencies of mutants in the unselected (KKA2_Bkg1) pool
  data: test_dataset/APH2_Melnikov_et_al_2014/data_lbl/aas/KKA2_Bkg1_from_seq_data

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_heatmap_KKA2_Bkg1_from_seq_data.png
   :name: 

# Frequencies of mutants in the KKA2_S1_Kan14_L1 pool
  data: test_dataset/APH2_Melnikov_et_al_2014/data_lbl/aas/KKA2_S1_Kan14_L1_from_seq_data

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_heatmap_KKA2_S1_Kan14_L1_from_seq_data.png
   :name: 

# Frequencies of mutants in the KKA2_S1_Kan11_L1 pool
  data: test_dataset/APH2_Melnikov_et_al_2014/data_lbl/aas/KKA2_S1_Kan11_L1_from_seq_data

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_heatmap_KKA2_S1_Kan11_L1_from_seq_data.png
   :name: 

# Mutation matrix of fitness scores of KKA2_S1_Kan14_L1 pool
  data: test_dataset/APH2_Melnikov_et_al_2014/data_fit/aas/KKA2_S1_Kan14_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_heatmap_KKA2_S1_Kan14_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred.png
   :name: 

# Mutation matrix of fitness scores of KKA2_S1_Kan11_L1 pool
  data: test_dataset/APH2_Melnikov_et_al_2014/data_fit/aas/KKA2_S1_Kan11_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_heatmap_KKA2_S1_Kan11_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred.png
   :name: 

# Distribution of fitness of KKA2_S1_Kan14_L1 pool
  data: test_dataset/APH2_Melnikov_et_al_2014/data_fit/aas/KKA2_S1_Kan14_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_dfe_KKA2_S1_Kan14_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred.png
   :name: 

# Distribution of fitness of KKA2_S1_Kan11_L1 pool
  data: test_dataset/APH2_Melnikov_et_al_2014/data_fit/aas/KKA2_S1_Kan11_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_dfe_KKA2_S1_Kan11_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred.png
   :name: 


# Substitution matrix of KKA2_S1_Kan14_L1 pool based on Fitness values
  data: test_dataset/APH2_Melnikov_et_al_2014/data_fit/aas/KKA2_S1_Kan14_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_sub_matrix_KKA2_S1_Kan14_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred.png
   :name: 

# Substitution matrix of KKA2_S1_Kan11_L1 pool based on Fitness values
  data: test_dataset/APH2_Melnikov_et_al_2014/data_fit/aas/KKA2_S1_Kan11_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_sub_matrix_KKA2_S1_Kan11_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred.png
   :name: 

# Fitness values of KKA2_S1_Kan14_L1 pool projected on PDB structure
  data: test_dataset/APH2_Melnikov_et_al_2014/data_fit/aas/KKA2_S1_Kan14_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_pdb_KKA2_S1_Kan14_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred.png
   :name: 


# Fitness values of KKA2_S1_Kan11_L1 pool projected on PDB structure
  data: test_dataset/APH2_Melnikov_et_al_2014/data_fit/aas/KKA2_S1_Kan11_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_pdb_KKA2_S1_Kan11_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred.png
   :name: 
   
# Comparison between two experimental conditions
  data: test_dataset/APH2_Melnikov_et_al_2014/data_comparison/aas/KKA2_S1_Kan11_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred_VERSUS_KKA2_S1_Kan14_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred

.. image:: _static//APH2_Melnikov_et_al_2014/plots/aas/fig_violin_KKA2_S1_Kan11_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred_VERSUS_KKA2_S1_Kan14_L1_from_seq_data_WRT_KKA2_Bkg1_from_seq_data_inferred.png
   :name: 

Input configurations
--------------------

Following configurations (located in `APH2_Melnikov_et_al_2014/cfg`) were used for analysis.

.. csv-table:: `APH2_Melnikov_et_al_2014/cfg/info`
   :file: _static/APH2_Melnikov_et_al_2014/cfg/info
   :header-rows: 1
   :stub-columns: 1

.. csv-table:: `APH2_Melnikov_et_al_2014/cfg/lbls`
   :file: _static/APH2_Melnikov_et_al_2014/cfg/lbls
   :header-rows: 1
   :stub-columns: 1

.. csv-table:: `APH2_Melnikov_et_al_2014/cfg/fit`
   :file: _static/APH2_Melnikov_et_al_2014/cfg/fit
   :header-rows: 1
   :stub-columns: 1

.. csv-table:: `APH2_Melnikov_et_al_2014/cfg/feats`
   :file: _static/APH2_Melnikov_et_al_2014/cfg/feats
   :header-rows: 1
   :stub-columns: 1

Citations
---------

.. [Melnikov] Melnikov, A., P. Rogov, L. Wang, A. Gnirke, and T.S. Mikkelsen. 2014. Comprehensive mutational scanning of a kinase in vivo reveals substrate-dependent fitness landscapes. Nucleic Acids Research. 42: 1–8.

.. [Firnberg] Firnberg, E., J.W. Labonte, J.J. Gray, and M. Ostermeier. 2014. A comprehensive, high-resolution map of a Gene’s fitness landscape. Molecular Biology and Evolution. 31: 1581–1592.
